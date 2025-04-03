import { View, Text, StyleSheet, FlatList, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { useRecipes } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"

const FavoritesScreen = () => {
  const navigation = useNavigation()
  const { recipes, favorites } = useRecipes()

  const favoriteRecipes = recipes.filter((recipe) => favorites.includes(recipe.id))

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate("RecipeDetail", { recipeId })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Favorites</Text>
        <Text style={styles.subtitle}>Your saved recipes</Text>
      </View>

      {favoriteRecipes.length > 0 ? (
        <FlatList
          data={favoriteRecipes}
          renderItem={({ item }) => <RecipeCard recipe={item} onPress={() => handleRecipePress(item.id)} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.recipeList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't saved any favorites yet.</Text>
          <Text style={styles.emptySubtext}>Tap the heart icon on recipes you love to save them here.</Text>
        </View>
      )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
})

export default FavoritesScreen

