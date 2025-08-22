import React, { useState, useEffect } from 'react';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import SplashScreen from './screens/SplashScreen'; // Importa la nueva pantalla de carga

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula una carga de datos o un tiempo de espera
    setTimeout(() => {
      setIsLoading(false); // Una vez "cargado", oculta la pantalla de carga
    }, 3000); // Muestra la pantalla de carga por 3 segundos
  }, []);

  if (isLoading) {
    return <SplashScreen />; // Muestra la pantalla de carga mientras isLoading es true
  }

  return <BottomTabNavigator />; // Muestra la app principal una vez cargada
}