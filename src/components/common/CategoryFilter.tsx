import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const categories = [
  {value: '', label: 'Todos'},
  {value: 'servicios', label: 'Servicios'},
  {value: 'productos', label: 'Productos'},
];

export const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <View style={styles.container}>
      {categories.map(category => (
        <TouchableOpacity
          key={category.value}
          style={[
            styles.categoryButton,
            selectedCategory === category.value && styles.selectedCategory,
          ]}
          onPress={() => onSelectCategory(category.value)}>
          <Text
            style={[
              styles.categoryText,
              selectedCategory === category.value &&
                styles.selectedCategoryText,
            ]}>
            {category.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(31, 41, 55, 0.5)',
    borderWidth: 1,
    borderColor: 'rgba(75, 85, 99, 0.5)',
  },
  selectedCategory: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    color: colors.text,
    fontSize: 14,
  },
  selectedCategoryText: {
    color: colors.backgroundDark,
    fontWeight: '600',
  },
});
