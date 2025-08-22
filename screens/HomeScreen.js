import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert, Platform } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReviewCard from '../components/ReviewCard';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [reviews, setReviews] = useState([]);

  const loadReviews = useCallback(async () => {
    try {
      const storedReviews = await AsyncStorage.getItem('user_reviews');
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error('Error cargando reseñas:', error);
      Alert.alert('Error', 'No se pudieron cargar las reseñas.');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadReviews();
    }, [loadReviews])
  );

  const handleDeleteReview = async (id) => {
    Alert.alert(
      'Eliminar Reseña',
      '¿Estás seguro de que quieres eliminar esta reseña?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const updatedReviews = reviews.filter(review => review.id !== id);
              await AsyncStorage.setItem('user_reviews', JSON.stringify(updatedReviews));
              setReviews(updatedReviews);
              Alert.alert('Éxito', 'Reseña eliminada correctamente.');
            } catch (error) {
              console.error('Error eliminando reseña:', error);
              Alert.alert('Error', 'No se pudo eliminar la reseña.');
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View style={styles.container}>
      {reviews.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>¡Aún no hay reseñas!</Text>
          <Text style={styles.emptyText}>Añade una desde la pestaña "Añadir".</Text>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <ReviewCard
              review={item}
              onPress={() => navigation.navigate('ReviewDetail', { review: item })}
              onDelete={() => handleDeleteReview(item.id)}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  listContent: {
    paddingBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#34495E',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default HomeScreen;