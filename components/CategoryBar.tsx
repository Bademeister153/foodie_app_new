import type React from "react"
import { ScrollView, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useRecipes } from "../context/RecipeContext"

type CategoryBarProps = {
  selectedCategory: string
  onSelectCategory: (category: string) => void
}

const CategoryBar: React.FC<CategoryBarProps> = ({ selectedCategory, onSelectCategory }) => {
  const { categories } = useRecipes()

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      {categories.map((category) => (
        <TouchableOpacity
          key={category}
          style={[styles.categoryButton, selectedCategory === category && styles.selectedCategory]}
          onPress={() => onSelectCategory(category)}
        >
          <Text style={[styles.categoryText, selectedCategory === category && styles.selectedCategoryText]}>
            {category}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#F0F0F0",
  },
  selectedCategory: {
    backgroundColor: "#FF6B6B",
  },
  categoryText: {
    fontWeight: "500",
    color: "#333",
  },
  selectedCategoryText: {
    color: "white",
  },
})

export default CategoryBar

