import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

const ReviewDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { review } = route.params;

  return (
    <ScrollView style={styles.container}>
      {review.imageUri ? (
        <Image source={{ uri: review.imageUri }} style={styles.reviewImage} />
      ) : (
        <View style={styles.noImagePlaceholder}>
          <Text style={styles.noImageText}>Sin imagen para esta reseña</Text>
        </View>
      )}

      <View style={styles.contentCard}>
        <Text style={styles.placeName}>{review.placeName}</Text>
        
        {/* Nueva sección para dirección y fecha */}
        <View style={styles.addressDateContainer}>
            {review.address && (
                <Text style={styles.addressDetailText}>📍 {review.address}</Text>
            )}
            {review.date && (
                <Text style={styles.dateDetailText}>📅 {new Date(review.date).toLocaleDateString()}</Text>
            )}
        </View>

        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text key={star} style={review.rating >= star ? styles.starSelected : styles.starUnselected}>
              ★
            </Text>
          ))}
        </View>

        <Text style={styles.reviewText}>{review.reviewText}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ECF0F1',
  },
  reviewImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  noImagePlaceholder: {
    width: '100%',
    height: 100,
    backgroundColor: '#D1D5DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  noImageText: {
    color: '#6B7280',
    fontSize: 16,
    fontStyle: 'italic',
  },
  contentCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    borderRadius: 10,
    padding: 20,
    marginTop: -50, // Pequeño solapamiento si hay imagen, si no, se ajustará bien
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  placeName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#34495E',
    marginBottom: 8,
    textAlign: 'center',
  },
  addressDateContainer: { // Nuevo estilo para agrupar dirección y fecha en detalle
    marginBottom: 15,
    alignItems: 'center',
  },
  addressDetailText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    textAlign: 'center',
  },
  dateDetailText: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ECF0F1',
    paddingBottom: 15,
  },
  starUnselected: {
    fontSize: 28,
    color: '#BDC3C7',
    marginHorizontal: 2,
  },
  starSelected: {
    fontSize: 28,
    color: '#F39C12',
    marginHorizontal: 2,
  },
  reviewText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#34495E',
    marginTop: 10,
    textAlign: 'justify',
  },
});

export default ReviewDetailScreen;