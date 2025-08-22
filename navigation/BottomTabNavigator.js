import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

// Importa tus pantallas
import AppNavigator from './AppNavigator'; // Para la pila de Home y sus detalles
import AddReviewScreen from '../screens/AddReviewScreen';
import SettingsScreen from '../screens/SettingsScreen';
import TrophiesScreen from '../screens/TrophiesScreen';

const Tab = createBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'InicioTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'AñadirTab') {
              iconName = focused ? 'add-circle' : 'add-circle-outline';
            } else if (route.name === 'AjustesTab') {
              iconName = focused ? 'settings' : 'settings-outline';
            } else if (route.name === 'TrofeosTab') {
              iconName = focused ? 'trophy' : 'trophy-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#3498DB',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#ECF0F1',
            height: Platform.OS === 'ios' ? 80 : 70, // Aumenta la altura para iOS por safe area
            paddingBottom: Platform.OS === 'ios' ? 25 : 15, // Aumenta el padding para iOS
            paddingTop: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: 'bold',
          },
          headerStyle: {
            backgroundColor: '#3498DB',
          },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen
          name="InicioTab"
          component={AppNavigator}
          options={{
            title: 'Inicio', // Título para el header del Tab
            headerShown: false, // Oculta el header de esta Tab, AppNavigator ya tiene el suyo
            tabBarLabel: 'Inicio', // Texto para la etiqueta de la pestaña
          }}
        />
        <Tab.Screen
          name="AñadirTab"
          component={AddReviewScreen}
          options={{
            title: 'Añadir Nueva Reseña', // Título para el header del Tab
            headerShown: true, // Muestra el header en esta Tab
            tabBarLabel: 'Añadir', // Texto corto para la etiqueta de la pestaña
          }}
        />
        <Tab.Screen
          name="TrofeosTab"
          component={TrophiesScreen}
          options={{
            title: 'Tus Logros', // Título para el header del Tab
            headerShown: true, // Muestra el header en esta Tab
            tabBarLabel: 'Trofeos', // Texto corto para la etiqueta de la pestaña
          }}
        />
        <Tab.Screen
          name="AjustesTab"
          component={SettingsScreen}
          options={{
            title: 'Configuración', // Título para el header del Tab
            headerShown: true, // Muestra el header en esta Tab
            tabBarLabel: 'Ajustes', // Texto corto para la etiqueta de la pestaña
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabNavigator;