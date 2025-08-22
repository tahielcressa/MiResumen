import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

// Lista de malas palabras (puedes expandirla considerablemente)
// Considera incluir variantes, regionalismos y posibles "leetspeak" (e.g., 'pendej0')
const BAD_WORDS = [
  'puta', 'mierda', 'gilipollas', 'cabron', 'joder', 'coño', 'subnormal',
  'idiota', 'estupido', 'imbecil', 'zorra', 'maricon', 'puto', 'verga',
  'boludo', 'tarado', 'malparido', 'concha', 'chingar', 'putamadre',
  // Añade más palabras según sea necesario para tu contexto
];

const AddReviewScreen = () => {
  const navigation = useNavigation();
  const [placeName, setPlaceName] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [imageUri, setImageUri] = useState(null);
  const [address, setAddress] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Función para detectar malas palabras
  const containsBadWords = (text) => {
    const lowerCaseText = text.toLowerCase();
    for (const word of BAD_WORDS) {
      // Usamos una expresión regular para buscar la palabra completa,
      // ignorando mayúsculas/minúsculas y evitando coincidencias parciales (ej. "miercoles" no es "mierda")
      const regex = new RegExp(`\\b${word}\\b`, 'i'); // \b para límites de palabra, i para case-insensitive
      if (regex.test(lowerCaseText)) {
        return true;
      }
    }
    return false;
  };

  const requestImagePermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permiso denegado',
        'Necesitamos permiso para acceder a tu galería de fotos para subir imágenes.'
      );
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestImagePermissions();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const handleSaveReview = async () => {
    // 1. Validar campos incompletos
    if (!placeName.trim() || !reviewText.trim() || rating === 0 || !address.trim()) {
      Alert.alert('Campos incompletos', 'Por favor, rellena todos los campos: nombre del lugar, dirección, reseña y puntuación.');
      return;
    }

    // 2. Validar malas palabras
    if (containsBadWords(reviewText)) {
      Alert.alert('Contenido Inapropiado', 'Tu reseña contiene palabras que no están permitidas. Por favor, revisa tu texto.');
      return; // Detiene el proceso si se encuentran malas palabras
    }

    const newReview = {
      id: Date.now().toString(),
      placeName,
      reviewText,
      rating,
      imageUri,
      address,
      date: date.toISOString(),
    };

    try {
      const storedReviews = await AsyncStorage.getItem('user_reviews');
      const reviews = storedReviews ? JSON.parse(storedReviews) : [];
      reviews.push(newReview);
      await AsyncStorage.setItem('user_reviews', JSON.stringify(reviews));
      Alert.alert('Éxito', '¡Tu reseña ha sido guardada!');
      
      // Limpiar el formulario después de guardar
      setPlaceName('');
      setReviewText('');
      setRating(0);
      setImageUri(null);
      setAddress('');
      setDate(new Date());

      navigation.navigate('InicioTab');
    } catch (error) {
      console.error('Error guardando reseña:', error);
      Alert.alert('Error', 'No se pudo guardar la reseña. Inténtalo de nuevo.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 20}
    >
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.label}>Nombre del Lugar:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Cafetería El Rincón"
          placeholderTextColor="#7F8C8D"
          value={placeName}
          onChangeText={setPlaceName}
        />

        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Calle Falsa 123, Ciudad"
          placeholderTextColor="#7F8C8D"
          value={address}
          onChangeText={setAddress}
        />

        <Text style={styles.label}>Fecha de Visita:</Text>
        <TouchableOpacity onPress={showDatepicker} style={styles.datePickerButton}>
          <Text style={styles.datePickerButtonText}>{date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}

        <Text style={styles.label}>Tu Reseña:</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escribe tu opinión sobre el lugar..."
          placeholderTextColor="#7F8C8D"
          multiline
          numberOfLines={4}
          value={reviewText}
          onChangeText={setReviewText}
        />

        <Text style={styles.label}>Puntuación (1-5):</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => setRating(star)} activeOpacity={0.7}>
              <Text style={rating >= star ? styles.starSelected : styles.starUnselected}>
                {rating >= star ? '★' : '☆'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Subir Imagen</Text>
        </TouchableOpacity>
        {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveReview}>
          <Text style={styles.saveButtonText}>Guardar Reseña</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    padding: 15,
  },
  contentContainer: {
    paddingBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#34495E',
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#34495E',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  starUnselected: {
    fontSize: 40,
    color: '#BDC3C7',
    marginRight: 2,
  },
  starSelected: {
    fontSize: 40,
    color: '#F39C12',
    marginRight: 2,
  },
  datePickerButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#BDC3C7',
    borderRadius: 8,
    padding: 12,
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  datePickerButtonText: {
    fontSize: 16,
    color: '#34495E',
  },
  button: {
    backgroundColor: '#E67E22',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 15,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#BDC3C7',
  },
  saveButton: {
    backgroundColor: '#2ECC71',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddReviewScreen;