import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Importa tus pantallas
import HomeScreen from '../screens/HomeScreen';
import AddReviewScreen from '../screens/AddReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ReviewDetailScreen from '../screens/ReviewDetailScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#3498DB' }, // Azul profundo
        headerTintColor: '#FFFFFF', // Texto blanco
        headerTitleStyle: { fontWeight: 'bold' },
        headerShown: true, // Asegura que el encabezado del Stack Navigator sea visible
        headerTitleAlign: 'center', // Centra el título
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Mi Reseña' }}
      />
      <Stack.Screen
        name="AddReview"
        component={AddReviewScreen}
        options={{ title: 'Añadir Nueva Reseña' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configuración' }}
      />
      <Stack.Screen
        name="ReviewDetail"
        component={ReviewDetailScreen}
        options={{ title: 'Detalle de la Reseña' }}
      />
    </Stack.Navigator>
  );
}

export default AppNavigator;