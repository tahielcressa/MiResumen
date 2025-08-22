import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const ReviewCard = ({ review, onPress, onDelete }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <Text style={styles.placeName}>{review.placeName}</Text>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>X</Text>
        </TouchableOpacity>
      </View>
      {review.imageUri && (
        <Image source={{ uri: review.imageUri }} style={styles.reviewImage} />
      )}
      
      {/* Nueva sección para dirección y fecha */}
      <View style={styles.infoContainer}>
        {review.address && (
            <Text style={styles.addressText}>📍 {review.address}</Text>
        )}
        {review.date && (
            <Text style={styles.dateText}>📅 {new Date(review.date).toLocaleDateString()}</Text>
        )}
      </View>

      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Text key={star} style={review.rating >= star ? styles.starSelected : styles.starUnselected}>
            {review.rating >= star ? '★' : '☆'}
          </Text>
        ))}
      </View>
      <Text style={styles.reviewText} numberOfLines={3}>
        {review.reviewText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  placeName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34495E',
    flexShrink: 1,
  },
  deleteButton: {
    backgroundColor: '#E74C3C',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  reviewImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
    resizeMode: 'cover',
    borderWidth: 1,
    borderColor: '#BDC3C7',
  },
  infoContainer: { // Nuevo estilo para agrupar dirección y fecha
    marginBottom: 8,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  dateText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starUnselected: {
    fontSize: 18,
    color: '#BDC3C7',
    marginRight: 2,
  },
  starSelected: {
    fontSize: 18,
    color: '#F39C12',
    marginRight: 2,
  },
  reviewText: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 22,
  },
});

export default ReviewCard;