import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { categories } from "../../utils/categoriesData";
import CategoryCard from "./CategoryCard";

interface CategoryFilterProps {
  selectedCategory: number;
  onSelectCategory: (index: number) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.categories}
    >
      {categories.map((category, index) => (
        <CategoryCard
          key={index}
          category={category}
          isSelected={index === selectedCategory}
          onPress={() => onSelectCategory(index)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categories: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 12,
  },
});

export default CategoryFilter;
