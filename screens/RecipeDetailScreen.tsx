import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView } from "react-native"
import { useRoute, type RouteProp, useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import { useRecipes } from "../context/RecipeContext"
import BackButton from "../components/BackButton"

type RecipeDetailRouteParams = {
  recipeId: string
}

const RecipeDetailScreen = () => {
  const route = useRoute<RouteProp<Record<string, RecipeDetailRouteParams>, string>>()
  const navigation = useNavigation()
  const { recipeId } = route.params
  const { recipes, toggleFavorite, isFavorite, deleteRecipe } = useRecipes()

  const recipe = recipes.find((r) => r.id === recipeId)

  if (!recipe) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Recipe not found</Text>
      </SafeAreaView>
    )
  }

  const handleEdit = () => {
    navigation.navigate("AddEditRecipe", { recipeId })
  }

  const handleDelete = () => {
    deleteRecipe(recipeId)
    navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <BackButton />
          <TouchableOpacity style={styles.favoriteButton} onPress={() => toggleFavorite(recipe.id)}>
            <Ionicons
              name={isFavorite(recipe.id) ? "heart" : "heart-outline"}
              size={28}
              color={isFavorite(recipe.id) ? "#FF6B6B" : "white"}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.title}>{recipe.name}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={20} color="#FF6B6B" />
              <Text style={styles.infoText}>Prep: {recipe.prepTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="restaurant-outline" size={20} color="#FF6B6B" />
              <Text style={styles.infoText}>Cook: {recipe.cookTime}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="people-outline" size={20} color="#FF6B6B" />
              <Text style={styles.infoText}>Serves: {recipe.servings}</Text>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Ionicons name="flame-outline" size={20} color="#FF6B6B" />
              <Text style={styles.infoText}>{recipe.calories} cal</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="speedometer-outline" size={20} color="#FF6B6B" />
              <Text style={styles.infoText}>Difficulty: {recipe.difficulty}</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            {recipe.ingredients.map((ingredient, index) => (
              <View key={index} style={styles.ingredientItem}>
                <Ionicons name="ellipse" size={8} color="#FF6B6B" style={styles.bullet} />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Instructions</Text>
            {recipe.instructions.map((instruction, index) => (
              <View key={index} style={styles.instructionItem}>
                <Text style={styles.instructionNumber}>{index + 1}</Text>
                <Text style={styles.instructionText}>{instruction}</Text>
              </View>
            ))}
          </View>

          {recipe.isUserCreated && (
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Ionicons name="create-outline" size={20} color="white" />
                <Text style={styles.buttonText}>Edit Recipe</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
                <Ionicons name="trash-outline" size={20} color="white" />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 300,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  favoriteButton: {
    position: "absolute",
    top: 40,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  infoText: {
    marginLeft: 4,
    color: "#666",
  },
  section: {
    marginTop: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  ingredientItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  bullet: {
    marginRight: 8,
  },
  ingredientText: {
    fontSize: 16,
    color: "#444",
  },
  instructionItem: {
    flexDirection: "row",
    marginBottom: 16,
  },
  instructionNumber: {
    backgroundColor: "#FF6B6B",
    color: "white",
    width: 24,
    height: 24,
    borderRadius: 12,
    textAlign: "center",
    marginRight: 12,
    fontWeight: "bold",
  },
  instructionText: {
    fontSize: 16,
    color: "#444",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
  },
  editButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    width: 100,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
})

export default RecipeDetailScreen

