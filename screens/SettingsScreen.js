import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const handleClearData = async () => {
    Alert.alert(
      'Borrar Todas las Reseñas',
      '¿Estás seguro de que quieres eliminar TODAS tus reseñas? Esta acción es irreversible.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Borrar Todo',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('user_reviews');
              Alert.alert('Éxito', 'Todas tus reseñas han sido borradas.');
            } catch (error) {
              console.error('Error borrando datos:', error);
              Alert.alert('Error', 'No se pudieron borrar los datos.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  const showPrivacyPolicy = () => {
    Alert.alert(
      'Política de Privacidad',
      'Tu privacidad es importante para nosotros. Esta aplicación no recopila información personal identificable. Todas tus reseñas y datos se almacenan localmente en tu dispositivo y no se comparten con terceros. Puedes borrar tus datos en cualquier momento desde esta pantalla de ajustes.',
      [{ text: 'Entendido' }]
    );
  };

  const dailyTips = [
    "¡Sé honesto! Tu opinión genuina ayuda a otros a decidir.",
    "Describe los detalles: ¿Qué te gustó o no te gustó específicamente?",
    "Considera el ambiente: ¿Era ruidoso, acogedor, concurrido?",
    "Si es un restaurante, menciona tus platos favoritos o los que no te gustaron.",
    "¿Hay estacionamiento fácil? Detalles como este son muy útiles.",
    "Si visitaste un lugar turístico, ¿vale la pena el precio de entrada?",
    "¡Añade fotos! Una imagen vale más que mil palabras y hace tu reseña más atractiva.",
    "Piensa en el servicio al cliente: ¿Fue amable, rápido, atento?",
    "Sé constructivo: Si tienes una queja, sugiere cómo podría mejorar el lugar.",
    "¡Revisa tu reseña antes de publicarla para evitar errores ortográficos!",
  ];

  const showDailyTip = () => {
    const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];
    Alert.alert('Consejo Diario', randomTip, [{ text: 'Genial' }]);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Opciones de la App</Text>
        <TouchableOpacity style={styles.optionButtonDanger} onPress={handleClearData}>
          <Ionicons name="trash-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.optionButtonText}>Borrar Todas las Reseñas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal y Privacidad</Text>
        <TouchableOpacity style={styles.optionButton} onPress={showPrivacyPolicy}>
          <Ionicons name="shield-checkmark-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.optionButtonText}>Política de Privacidad</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Consejos</Text>
        <TouchableOpacity style={styles.optionButtonPrimary} onPress={showDailyTip}>
          <Ionicons name="bulb-outline" size={20} color="#FFFFFF" style={styles.buttonIcon} />
          <Text style={styles.optionButtonText}>Consejo Diario</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    padding: 15,
  },
  section: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#BDC3C7',
    paddingBottom: 10,
  },
  optionButton: { // Estilo para botones de opción general (ahora Política de Privacidad)
    backgroundColor: '#3498DB', // Azul neutro
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10,
  },
  optionButtonDanger: { // Estilo específico para acciones destructivas
    backgroundColor: '#E74C3C', // Rojo
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10,
  },
  optionButtonPrimary: { // Estilo para botones de acción principal (Consejo Diario)
    backgroundColor: '#2ECC71', // Verde
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonIcon: {
    marginRight: 10,
  },
  optionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;