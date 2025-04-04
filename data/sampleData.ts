import type { Recipe } from "../context/RecipeContext"

export const sampleRecipes: Recipe[] = [
  {
    id: "1",
    name: "Classic Pancakes",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    category: "Breakfast",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 4,
    calories: 250,
    difficulty: "Easy",
    ingredients: [
      "1 cup all-purpose flour",
      "2 tablespoons sugar",
      "2 teaspoons baking powder",
      "1/2 teaspoon salt",
      "1 cup milk",
      "2 tablespoons melted butter",
      "1 large egg",
      "1 teaspoon vanilla extract",
    ],
    instructions: [
      "In a large bowl, whisk together flour, sugar, baking powder, and salt.",
      "In another bowl, beat the milk, melted butter, egg, and vanilla together.",
      "Pour the wet ingredients into the dry ingredients and stir until just combined. Don't overmix.",
      "Heat a griddle or frying pan over medium heat. Grease lightly with butter or oil.",
      "Pour 1/4 cup of batter onto the griddle for each pancake.",
      "Cook until bubbles form on the surface, then flip and cook until golden brown on both sides.",
      "Serve warm with maple syrup, fresh fruit, or your favorite toppings.",
    ],
    isUserCreated: false,
  },
  {
    id: "2",
    name: "Avocado Toast",
    image:
      "https://images.unsplash.com/photo-1588137378633-dea1336ce1e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    category: "Breakfast",
    prepTime: "5 mins",
    cookTime: "5 mins",
    servings: 1,
    calories: 320,
    difficulty: "Easy",
    ingredients: [
      "1 slice of whole grain bread",
      "1/2 ripe avocado",
      "1/4 teaspoon salt",
      "1/4 teaspoon black pepper",
      "1/4 teaspoon red pepper flakes (optional)",
      "1/2 teaspoon lemon juice",
      "1 egg (optional)",
    ],
    instructions: [
      "Toast the bread until golden and firm.",
      "Remove the pit from the avocado and scoop the flesh into a bowl.",
      "Add salt, pepper, and lemon juice to the avocado and mash with a fork to your desired consistency.",
      "Spread the mashed avocado on top of the toast.",
      "If desired, top with a fried or poached egg.",
      "Sprinkle with red pepper flakes if using.",
      "Serve immediately and enjoy!",
    ],
    isUserCreated: false,
  },
  {
    id: "3",
    name: "Spaghetti Carbonara",
    image:
      "https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    category: "Dinner",
    prepTime: "10 mins",
    cookTime: "15 mins",
    servings: 4,
    calories: 450,
    difficulty: "Medium",
    ingredients: [
      "1 pound spaghetti",
      "8 ounces pancetta or bacon, diced",
      "4 large eggs",
      "1 cup freshly grated Parmesan cheese",
      "1 teaspoon black pepper",
      "1/2 teaspoon salt",
      "2 cloves garlic, minced",
      "2 tablespoons fresh parsley, chopped",
    ],
    instructions: [
      "Bring a large pot of salted water to a boil. Add the spaghetti and cook until al dente.",
      "While the pasta is cooking, heat a large skillet over medium heat. Add the pancetta and cook until crispy.",
      "In a bowl, whisk together the eggs, Parmesan cheese, black pepper, and salt.",
      "When the pasta is done, reserve 1/2 cup of the pasta water, then drain the pasta.",
      "Working quickly, add the hot pasta to the skillet with the pancetta. Toss to combine.",
      "Remove the skillet from the heat and pour in the egg mixture, stirring quickly to create a creamy sauce.",
      "Add a splash of the reserved pasta water if needed to loosen the sauce.",
      "Garnish with additional Parmesan cheese and chopped parsley. Serve immediately.",
    ],
    isUserCreated: false,
  },
  {
    id: "4",
    name: "Chocolate Chip Cookies",
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    category: "Dessert",
    prepTime: "15 mins",
    cookTime: "10 mins",
    servings: 24,
    calories: 150,
    difficulty: "Easy",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "2 teaspoons vanilla extract",
      "2 cups semi-sweet chocolate chips",
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, whisk together the flour, baking soda, and salt.",
      "In a large bowl, beat the butter, granulated sugar, and brown sugar until creamy.",
      "Add the eggs one at a time, beating well after each addition. Stir in the vanilla.",
      "Gradually beat in the flour mixture.",
      "Stir in the chocolate chips.",
      "Drop by rounded tablespoon onto ungreased baking sheets.",
      "Bake for 9 to 11 minutes or until golden brown.",
      "Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.",
    ],
    isUserCreated: false,
  },
  {
    id: "5",
    name: "Greek Salad",
    image:
      "https://images.unsplash.com/photo-1540420773420-3366772f4999?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1080&q=80",
    category: "Lunch",
    prepTime: "15 mins",
    cookTime: "0 mins",
    servings: 4,
    calories: 220,
    difficulty: "Easy",
    ingredients: [
      "1 large cucumber, diced",
      "4 large tomatoes, diced",
      "1 red onion, thinly sliced",
      "1 green bell pepper, diced",
      "1 cup Kalamata olives",
      "8 ounces feta cheese, cubed",
      "2 tablespoons extra virgin olive oil",
      "1 tablespoon red wine vinegar",
      "1 teaspoon dried oregano",
      "Salt and pepper to taste",
    ],
    instructions: [
      "In a large bowl, combine the cucumber, tomatoes, red onion, bell pepper, and olives.",
      "Add the feta cheese to the salad.",
      "In a small bowl, whisk together the olive oil, red wine vinegar, oregano, salt, and pepper.",
      "Pour the dressing over the salad and toss gently to combine.",
      "Serve immediately or refrigerate for up to 1 hour before serving.",
    ],
    isUserCreated: false,
  },
]

