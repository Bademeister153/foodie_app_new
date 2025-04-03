import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

// Screens
import MainFeedScreen from "./screens/MainFeedScreen"
import RecipeDetailScreen from "./screens/RecipeDetailScreen"
import FavoritesScreen from "./screens/FavoritesScreen"
import MyFoodScreen from "./screens/MyFoodScreen"
import AddEditRecipeScreen from "./screens/AddEditRecipeScreen"

// Context
import { RecipeProvider } from "./context/RecipeContext"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const MainStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MainFeed" component={MainFeedScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="AddEditRecipe" component={AddEditRecipeScreen} />
    </Stack.Navigator>
  )
}

const FavoritesStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FavoritesList" component={FavoritesScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
    </Stack.Navigator>
  )
}

const MyFoodStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="MyFoodList" component={MyFoodScreen} />
      <Stack.Screen name="RecipeDetail" component={RecipeDetailScreen} />
      <Stack.Screen name="AddEditRecipe" component={AddEditRecipeScreen} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <SafeAreaProvider>
      <RecipeProvider>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName

                if (route.name === "Home") {
                  iconName = focused ? "home" : "home-outline"
                } else if (route.name === "Favorites") {
                  iconName = focused ? "heart" : "heart-outline"
                } else if (route.name === "My Food") {
                  iconName = focused ? "restaurant" : "restaurant-outline"
                }

                return <Ionicons name={iconName} size={size} color={color} />
              },
              tabBarActiveTintColor: "#FF6B6B",
              tabBarInactiveTintColor: "gray",
              headerShown: false,
            })}
          >
            <Tab.Screen name="Home" component={MainStack} />
            <Tab.Screen name="Favorites" component={FavoritesStack} />
            <Tab.Screen name="My Food" component={MyFoodStack} />
          </Tab.Navigator>
        </NavigationContainer>
      </RecipeProvider>
    </SafeAreaProvider>
  )
}

