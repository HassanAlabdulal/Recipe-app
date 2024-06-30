import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";

interface Category {
  name: string;
  image: any;
}

interface CategoryCardProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.category, isSelected && styles.selectedCategory]}
      onPress={onPress}
    >
      <Image source={category.image} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  category: {
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    width: 80,
    height: 85,
    marginRight: 10,
  },
  selectedCategory: {
    backgroundColor: "#F6A028",
  },
  categoryImage: {
    width: 45,
    height: 45,
    borderRadius: 20,
    marginBottom: 4,
    objectFit: "contain",
  },
  categoryText: {
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default CategoryCard;
