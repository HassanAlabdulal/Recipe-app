import React from "react";
import { TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable";

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
    <Animatable.View
      animation="zoomIn"
      easing="ease-in"
      duration={500}
      style={styles.animatableContainer}
    >
      <TouchableOpacity
        style={[styles.category, isSelected && styles.selectedCategory]}
        onPress={onPress}
      >
        <Image source={category.image} style={styles.categoryImage} />
        <Text style={styles.categoryText}>{category.name}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  animatableContainer: {
    marginRight: 10,
  },
  category: {
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: "#FFF",
    borderRadius: 12,
    alignItems: "center",
    width: 80,
    height: 85,
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
