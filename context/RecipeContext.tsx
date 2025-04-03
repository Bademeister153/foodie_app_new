"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { sampleRecipes } from "../data/sampleData"

export type Recipe = {
  id: string
  name: string
  image: string
  category: string
  prepTime: string
  cookTime: string
  servings: number
  calories: number
  difficulty: "Easy" | "Medium" | "Hard"
  ingredients: string[]
  instructions: string[]
  isUserCreated: boolean
}

type RecipeContextType = {
  recipes: Recipe[]
  favorites: string[]
  categories: string[]
  addRecipe: (recipe: Omit<Recipe, "id">) => void
  updateRecipe: (id: string, recipe: Omit<Recipe, "id">) => void
  deleteRecipe: (id: string) => void
  toggleFavorite: (id: string) => void
  isFavorite: (id: string) => boolean
  getUserRecipes: () => Recipe[]
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined)

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(sampleRecipes)
  const [favorites, setFavorites] = useState<string[]>([])
  const [categories, setCategories] = useState<string[]>([
    "All",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Dessert",
    "Snacks",
    "Vegetarian",
    "Vegan",
  ])

  // Load data from AsyncStorage on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const storedRecipes = await AsyncStorage.getItem("recipes")
        const storedFavorites = await AsyncStorage.getItem("favorites")

        if (storedRecipes) {
          setRecipes(JSON.parse(storedRecipes))
        }

        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites))
        }
      } catch (error) {
        console.error("Error loading data from storage:", error)
      }
    }

    loadData()
  }, [])

  // Save data to AsyncStorage whenever it changes
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("recipes", JSON.stringify(recipes))
        await AsyncStorage.setItem("favorites", JSON.stringify(favorites))
      } catch (error) {
        console.error("Error saving data to storage:", error)
      }
    }

    saveData()
  }, [recipes, favorites])

  const addRecipe = (recipe: Omit<Recipe, "id">) => {
    const newRecipe = {
      ...recipe,
      id: Date.now().toString(),
    }

    setRecipes((prevRecipes) => [...prevRecipes, newRecipe as Recipe])
  }

  const updateRecipe = (id: string, updatedRecipe: Omit<Recipe, "id">) => {
    setRecipes((prevRecipes) =>
      prevRecipes.map((recipe) => (recipe.id === id ? ({ ...updatedRecipe, id } as Recipe) : recipe)),
    )
  }

  const deleteRecipe = (id: string) => {
    setRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe.id !== id))

    // Also remove from favorites if it's there
    if (favorites.includes(id)) {
      setFavorites((prevFavorites) => prevFavorites.filter((favId) => favId !== id))
    }
  }

  const toggleFavorite = (id: string) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favId) => favId !== id)
      } else {
        return [...prevFavorites, id]
      }
    })
  }

  const isFavorite = (id: string) => favorites.includes(id)

  const getUserRecipes = () => recipes.filter((recipe) => recipe.isUserCreated)

  return (
    <RecipeContext.Provider
      value={{
        recipes,
        favorites,
        categories,
        addRecipe,
        updateRecipe,
        deleteRecipe,
        toggleFavorite,
        isFavorite,
        getUserRecipes,
      }}
    >
      {children}
    </RecipeContext.Provider>
  )
}

export const useRecipes = () => {
  const context = useContext(RecipeContext)
  if (context === undefined) {
    throw new Error("useRecipes must be used within a RecipeProvider")
  }
  return context
}

