"use client"

import { useState, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
} from "react-native"
import { useRoute, type RouteProp, useNavigation } from "@react-navigation/native"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from "expo-image-picker"
import { Picker } from "@react-native-picker/picker"
import { useRecipes } from "../context/RecipeContext"
import BackButton from "../components/BackButton"

type AddEditRecipeRouteParams = {
  recipeId?: string
}

const AddEditRecipeScreen = () => {
  const route = useRoute<RouteProp<Record<string, AddEditRecipeRouteParams>, string>>()
  const navigation = useNavigation()
  const { recipes, addRecipe, updateRecipe, categories } = useRecipes()

  const recipeId = route.params?.recipeId
  const existingRecipe = recipeId ? recipes.find((r) => r.id === recipeId) : null
  const isEditing = !!existingRecipe

  const [name, setName] = useState(existingRecipe?.name || "")
  const [image, setImage] = useState(existingRecipe?.image || "https://via.placeholder.com/400x300")
  const [category, setCategory] = useState(existingRecipe?.category || categories[1])
  const [prepTime, setPrepTime] = useState(existingRecipe?.prepTime || "")
  const [cookTime, setCookTime] = useState(existingRecipe?.cookTime || "")
  const [servings, setServings] = useState(existingRecipe?.servings.toString() || "")
  const [calories, setCalories] = useState(existingRecipe?.calories.toString() || "")
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">(existingRecipe?.difficulty || "Easy")
  const [ingredients, setIngredients] = useState<string[]>(existingRecipe?.ingredients || [""])
  const [instructions, setInstructions] = useState<string[]>(existingRecipe?.instructions || [""])

  useEffect(() => {
    // Request permission for image picker
    ;(async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== "granted") {
        Alert.alert("Permission needed", "Please grant camera roll permissions to upload images.")
      }
    })()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    }
  }

  const addIngredient = () => {
    setIngredients([...ingredients, ""])
  }

  const updateIngredient = (text: string, index: number) => {
    const newIngredients = [...ingredients]
    newIngredients[index] = text
    setIngredients(newIngredients)
  }

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      const newIngredients = [...ingredients]
      newIngredients.splice(index, 1)
      setIngredients(newIngredients)
    }
  }

  const addInstruction = () => {
    setInstructions([...instructions, ""])
  }

  const updateInstruction = (text: string, index: number) => {
    const newInstructions = [...instructions]
    newInstructions[index] = text
    setInstructions(newInstructions)
  }

  const removeInstruction = (index: number) => {
    if (instructions.length > 1) {
      const newInstructions = [...instructions]
      newInstructions.splice(index, 1)
      setInstructions(newInstructions)
    }
  }

  const validateForm = () => {
    if (!name.trim()) {
      Alert.alert("Error", "Please enter a recipe name")
      return false
    }
    if (!prepTime.trim()) {
      Alert.alert("Error", "Please enter preparation time")
      return false
    }
    if (!cookTime.trim()) {
      Alert.alert("Error", "Please enter cooking time")
      return false
    }
    if (!servings.trim() || isNaN(Number(servings))) {
      Alert.alert("Error", "Please enter a valid number of servings")
      return false
    }
    if (!calories.trim() || isNaN(Number(calories))) {
      Alert.alert("Error", "Please enter a valid number of calories")
      return false
    }
    if (ingredients.some((i) => !i.trim())) {
      Alert.alert("Error", "Please fill in all ingredients or remove empty ones")
      return false
    }
    if (instructions.some((i) => !i.trim())) {
      Alert.alert("Error", "Please fill in all instructions or remove empty ones")
      return false
    }
    return true
  }

  const handleSave = () => {
    if (!validateForm()) return

    const recipeData = {
      name,
      image,
      category,
      prepTime,
      cookTime,
      servings: Number(servings),
      calories: Number(calories),
      difficulty,
      ingredients: ingredients.filter((i) => i.trim()),
      instructions: instructions.filter((i) => i.trim()),
      isUserCreated: true,
    }

    if (isEditing && recipeId) {
      updateRecipe(recipeId, recipeData)
      Alert.alert("Success", "Recipe updated successfully")
    } else {
      addRecipe(recipeData)
      Alert.alert("Success", "Recipe added successfully")
    }

    navigation.goBack()
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{isEditing ? "Edit Recipe" : "Add New Recipe"}</Text>
          <BackButton />
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.imageOverlay}>
              <Ionicons name="camera" size={24} color="white" />
              <Text style={styles.imageText}>Tap to change image</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Recipe Name</Text>
            <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter recipe name" />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Category</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={category}
                onValueChange={(itemValue) => setCategory(itemValue)}
                style={styles.picker}
              >
                {categories.slice(1).map((cat) => (
                  <Picker.Item key={cat} label={cat} value={cat} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Prep Time</Text>
              <TextInput style={styles.input} value={prepTime} onChangeText={setPrepTime} placeholder="e.g. 15 mins" />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Cook Time</Text>
              <TextInput style={styles.input} value={cookTime} onChangeText={setCookTime} placeholder="e.g. 30 mins" />
            </View>
          </View>

          <View style={styles.row}>
            <View style={[styles.formGroup, { flex: 1, marginRight: 8 }]}>
              <Text style={styles.label}>Servings</Text>
              <TextInput
                style={styles.input}
                value={servings}
                onChangeText={setServings}
                placeholder="e.g. 4"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.formGroup, { flex: 1, marginLeft: 8 }]}>
              <Text style={styles.label}>Calories</Text>
              <TextInput
                style={styles.input}
                value={calories}
                onChangeText={setCalories}
                placeholder="e.g. 350"
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Difficulty</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={difficulty}
                onValueChange={(itemValue) => setDifficulty(itemValue as "Easy" | "Medium" | "Hard")}
                style={styles.picker}
              >
                <Picker.Item label="Easy" value="Easy" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="Hard" value="Hard" />
              </Picker>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Ingredients</Text>
            {ingredients.map((ingredient, index) => (
              <View key={index} style={styles.listItemContainer}>
                <TextInput
                  style={styles.listItemInput}
                  value={ingredient}
                  onChangeText={(text) => updateIngredient(text, index)}
                  placeholder={`Ingredient ${index + 1}`}
                />
                <TouchableOpacity style={styles.removeButton} onPress={() => removeIngredient(index)}>
                  <Ionicons name="close-circle" size={24} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addIngredient}>
              <Ionicons name="add-circle" size={20} color="white" />
              <Text style={styles.addButtonText}>Add Ingredient</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Instructions</Text>
            {instructions.map((instruction, index) => (
              <View key={index} style={styles.listItemContainer}>
                <TextInput
                  style={styles.listItemInput}
                  value={instruction}
                  onChangeText={(text) => updateInstruction(text, index)}
                  placeholder={`Step ${index + 1}`}
                  multiline
                />
                <TouchableOpacity style={styles.removeButton} onPress={() => removeInstruction(index)}>
                  <Ionicons name="close-circle" size={24} color="#F44336" />
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity style={styles.addButton} onPress={addInstruction}>
              <Ionicons name="add-circle" size={20} color="white" />
              <Text style={styles.addButtonText}>Add Step</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>{isEditing ? "Update Recipe" : "Save Recipe"}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  header: {
    height: 120,
    backgroundColor: "#FF6B6B",
    justifyContent: "flex-end",
    padding: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  content: {
    padding: 16,
  },
  imageContainer: {
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  imageText: {
    color: "white",
    marginLeft: 8,
    fontWeight: "500",
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  input: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  row: {
    flexDirection: "row",
  },
  pickerContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
  },
  picker: {
    height: 50,
  },
  listItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  listItemInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  removeButton: {
    marginLeft: 8,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 8,
  },
  saveButton: {
    backgroundColor: "#FF6B6B",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
})

export default AddEditRecipeScreen

