import type React from "react"
import { TouchableOpacity, Image, Text, StyleSheet, View, Dimensions } from "react-native"
import type { Recipe } from "../context/RecipeContext"

type RecipeCardProps = {
  recipe: Recipe
  onPress: () => void
}

const { width } = Dimensions.get("window")
const cardWidth = (width - 40) / 2 // 2 cards per row with some margin

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2}>
          {recipe.name}
        </Text>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{recipe.difficulty}</Text>
          <Text style={styles.info}>{recipe.prepTime}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  card: {
    width: cardWidth,
    height: 200,
    margin: 8,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 10,
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  info: {
    color: "#FFC107",
    fontSize: 12,
  },
})

export default RecipeCard

