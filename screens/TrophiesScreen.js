import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

// Definimos la lista completa de trofeos posibles con sus umbrales
const ALL_TROPHIES = [
  { id: '1', name: 'Crítico Novato', description: 'Publicaste tu primera reseña.', threshold: 1, icon: 'bookmark' },
  { id: '2', name: 'Explorador Ávido', description: 'Publicaste 5 reseñas.', threshold: 5, icon: 'map' },
  { id: '3', name: 'Maestro Reseñador', description: 'Publicaste 10 reseñas.', threshold: 10, icon: 'trophy' },
  { id: '4', name: 'Crítico Experto', description: 'Publicaste 25 reseñas.', threshold: 25, icon: 'star' },
  { id: '5', name: 'Leyenda de Reseñas', description: 'Publicaste 50 reseñas. ¡Impresionante!', threshold: 50, icon: 'medal' },
  { id: '6', name: 'La Voz del Pueblo', description: 'Tienes al menos una reseña con 5 estrellas.', threshold: { type: 'rating', value: 5 }, icon: 'happy' },
];

const TrophiesScreen = () => {
  const [totalReviews, setTotalReviews] = useState(0);
  const [userTrophies, setUserTrophies] = useState([]);
  const [loading, setLoading] = useState(true);

  const checkTrophies = useCallback(async (reviewsParam) => {
    const reviews = Array.isArray(reviewsParam) ? reviewsParam : [];
    const numReviews = reviews.length;
    let hasFiveStarReview = false;

    if (reviews.some(r => r.rating === 5)) {
      hasFiveStarReview = true;
    }

    const earned = ALL_TROPHIES.map(trophy => {
      let isUnlocked = false;
      let progress = 0;

      if (typeof trophy.threshold === 'number') {
        isUnlocked = numReviews >= trophy.threshold;
        progress = Math.min(numReviews / trophy.threshold, 1);
      } else if (typeof trophy.threshold === 'object' && trophy.threshold.type === 'rating') {
        if (trophy.threshold.value === 5) {
          isUnlocked = hasFiveStarReview;
          progress = hasFiveStarReview ? 1 : 0;
        }
      }

      return {
        ...trophy,
        isUnlocked,
        progress: parseFloat(progress.toFixed(2)),
        currentValue: numReviews,
      };
    });
    setUserTrophies(earned);
  }, []);

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const storedReviews = await AsyncStorage.getItem('user_reviews');
      const reviews = storedReviews ? JSON.parse(storedReviews) : [];
      setTotalReviews(reviews.length);
      await checkTrophies(reviews);
    } catch (error) {
      console.error('Error cargando datos de trofeos:', error);
      Alert.alert('Error', 'No se pudieron cargar tus trofeos.');
    } finally {
      setLoading(false);
    }
  }, [checkTrophies]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData])
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#3498DB" />
        <Text style={{ marginTop: 10, color: '#34495E' }}>Cargando trofeos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsSummaryContainer}>
        <Text style={styles.statsSummary}>
          Has publicado **{totalReviews}** reseñas en total.
        </Text>
      </View>
      <View style={styles.trophiesGrid}>
          {userTrophies.map((trophy) => (
            <View
              key={trophy.id}
              style={[
                styles.trophyCard,
                trophy.isUnlocked ? styles.trophyCardUnlocked : styles.trophyCardLocked,
              ]}
            >
              <Ionicons
                name={trophy.icon}
                size={40}
                color={trophy.isUnlocked ? '#F39C12' : '#BDC3C7'}
              />
              <Text
                style={[
                  styles.trophyName,
                  trophy.isUnlocked ? styles.trophyNameUnlocked : styles.trophyNameLocked,
                ]}
              >
                {trophy.name}
              </Text>
              <Text
                style={[
                  styles.trophyDescription,
                  trophy.isUnlocked ? styles.trophyDescriptionUnlocked : styles.trophyDescriptionLocked,
                ]}
              >
                {trophy.description}
              </Text>
              {!trophy.isUnlocked && typeof trophy.threshold === 'number' && (
                <Text style={styles.trophyProgress}>
                  Progreso: {trophy.currentValue}/{trophy.threshold} reseñas
                </Text>
              )}
              {!trophy.isUnlocked && typeof trophy.threshold === 'object' && trophy.threshold.type === 'rating' && (
                  <Text style={styles.trophyProgress}>
                      Progreso: Necesitas una reseña de {trophy.threshold.value} estrellas
                  </Text>
              )}

              <View style={styles.trophyStatusIndicator}>
                {trophy.isUnlocked ? (
                  <Ionicons name="checkmark-circle" size={24} color="#2ECC71" />
                ) : (
                  <Ionicons name="lock-closed" size={24} color="#E74C3C" />
                )}
              </View>
            </View>
          ))}
        </View>
        {userTrophies.length === 0 && !loading && (
          <Text style={styles.noTrophiesText}>
            ¡Aún no tienes trofeos! Publica reseñas para empezar a desbloquearlos.
          </Text>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
    padding: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECF0F1',
  },
  statsSummaryContainer: {
    marginBottom: 20,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#F2F2F2',
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statsSummary: {
    fontSize: 16,
    color: '#34495E',
    textAlign: 'center',
  },
  trophiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  trophyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    margin: 8,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    minHeight: 180,
  },
  trophyCardUnlocked: {
    borderColor: '#2ECC71',
    borderWidth: 2,
  },
  trophyCardLocked: {
    borderColor: '#BDC3C7',
    borderWidth: 2,
    opacity: 0.7,
  },
  trophyName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  trophyNameUnlocked: {
    color: '#34495E',
  },
  trophyNameLocked: {
    color: '#7F8C8D',
  },
  trophyDescription: {
    fontSize: 12,
    marginTop: 5,
    textAlign: 'center',
  },
  trophyDescriptionUnlocked: {
    color: '#34495E',
  },
  trophyDescriptionLocked: {
    color: '#7F8C8D',
  },
  trophyProgress: {
    fontSize: 11,
    marginTop: 5,
    color: '#E67E22',
    fontWeight: 'bold',
  },
  trophyStatusIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  noTrophiesText: {
    fontSize: 16,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default TrophiesScreen;