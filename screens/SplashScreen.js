import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Tu imagen miresumen.png */}
      <Image
        source={require('../assets/miresumen.png')} // Asegúrate de que esta ruta sea correcta
        style={styles.logo}
        resizeMode="contain" // Ajusta el modo de redimensionado según tu imagen
      />

      {/* Título de la app */}
      <Text style={styles.appName}>Mi Reseña</Text>

      {/* Texto de desarrollado por */}
      <Text style={styles.developerText}>
        Developed by <Text style={styles.developerName}>TAaapps</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', // ¡CAMBIADO A BLANCO PURO!
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150, // Ajusta el tamaño según tu imagen
    height: 150, // Ajusta el tamaño según tu imagen
    marginBottom: 30, // Espacio entre el logo y el nombre de la app
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#34495E', // Color de texto oscuro
    marginBottom: 10,
  },
  developerText: {
    fontSize: 16,
    color: '#7F8C8D', // Gris medio para el texto general
  },
  developerName: {
    color: '#E67E22', // Naranja para "TAaapps"
    fontWeight: 'bold',
  },
});

export default SplashScreen;