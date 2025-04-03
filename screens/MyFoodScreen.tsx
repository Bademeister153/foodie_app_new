import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useRecipes } from "../context/RecipeContext"
import RecipeCard from "../components/RecipeCard"

const MyFoodScreen = () => {
  const navigation = useNavigation()
  const { getUserRecipes } = useRecipes()

  const userRecipes = getUserRecipes()

  const handleRecipePress = (recipeId: string) => {
    navigation.navigate("RecipeDetail", { recipeId })
  }

  const handleAddRecipe = () => {
    navigation.navigate("AddEditRecipe")
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Food</Text>
        <Text style={styles.subtitle}>Your personal recipes</Text>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddRecipe}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.addButtonText}>Add New Recipe</Text>
      </TouchableOpacity>

      {userRecipes.length > 0 ? (
        <FlatList
          data={userRecipes}
          renderItem={({ item }) => <RecipeCard recipe={item} onPress={() => handleRecipePress(item.id)} />}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.recipeList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>You haven't created any recipes yet.</Text>
          <Text style={styles.emptySubtext}>Tap the "Add New Recipe" button to create your first recipe.</Text>
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
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    padding: 12,
    margin: 16,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    marginLeft: 8,
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

export default MyFoodScreen

