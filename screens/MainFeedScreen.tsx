"use client"

import { useState } from "react"
import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRecipes } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"
import CategoryBar from "../components/CategoryBar"

const MainFeedScreen = () => {
  const navigation = useNavigation()
  const { recipes } = useRecipes()
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredRecipes =
    selectedCategory === "All" ? recipes : recipes.filter((recipe) => recipe.category === selectedCategory)

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate("RecipeDetail", { recipeId })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Foodie</Text>
        <Text style={styles.subtitle}>Discover delicious recipes</Text>
      </View>

      <CategoryBar selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />

      <FlatList
        data={filteredRecipes}
        renderItem={({ item }) => <RecipeCard recipe={item} onPress={() => handleRecipePress(item.id)} />}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.recipeList}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    padding: 16,
    paddingTop: 60,
    backgroundColor: "#FF6B6B",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    opacity: 0.8,
  },
  recipeList: {
    padding: 8,
    paddingBottom: 20,
  },
})

export default MainFeedScreen

