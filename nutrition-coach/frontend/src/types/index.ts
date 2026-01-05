export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface UserProfile {
  id: string;
  userId: string;
  age: number;
  gender: Gender;
  weightKg: number;
  heightCm: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  targetCalories: number;
  targetProteinG: number;
  targetCarbsG: number;
  targetFatG: number;
  dietaryRestrictions: string[];
  allergies: string[];
  likedFoods: string[];
  dislikedFoods: string[];
  dailyBudget: number | null;
  cookingPreference: CookingDifficulty | null;
  createdAt: string;
  updatedAt: string;
}

export type CookingDifficulty = 'NO_COOKING' | 'VERY_EASY' | 'EASY' | 'MEDIUM' | 'COMPLEX';

export type Gender = 'MALE' | 'FEMALE' | 'OTHER';

export type ActivityLevel =
  | 'SEDENTARY'
  | 'LIGHT'
  | 'MODERATE'
  | 'ACTIVE'
  | 'VERY_ACTIVE';

export type FitnessGoal =
  | 'LOSE_WEIGHT'
  | 'MAINTAIN'
  | 'GAIN_WEIGHT'
  | 'BUILD_MUSCLE';

export type MealType = 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';

export interface Meal {
  id: string;
  userId: string;
  name: string;
  description?: string;
  mealType: MealType;
  consumedAt: string;
  calories: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
  fiberG?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DailyNutrition {
  date: string;
  totalCalories: number;
  totalProteinG: number;
  totalCarbsG: number;
  totalFatG: number;
  mealsCount: number;
}

export interface ChatMessage {
  id: string;
  userId: string;
  role: 'USER' | 'ASSISTANT';
  content: string;
  metadata?: any;
  createdAt: string;
}

export interface NutritionStats {
  totalMealsLogged: number;
  currentStreak: number;
  avgDailyCalories: number;
  daysTracked: number;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface DailyNutritionResponse {
  date: string;
  current: {
    totalCalories: number;
    totalProteinG: number;
    totalCarbsG: number;
    totalFatG: number;
    mealsCount: number;
  };
  targets: {
    targetCalories: number;
    targetProteinG: number;
    targetCarbsG: number;
    targetFatG: number;
  } | null;
}

// ═══════════════════════════════════════════════════════════════
// GROCERY TYPES
// ═══════════════════════════════════════════════════════════════

export type GroceryCategory =
  | 'PROTEINS' | 'CARBS' | 'DAIRY' | 'VEGETABLES' | 'FRUITS'
  | 'LEGUMES_CANNED' | 'OILS_SAUCES' | 'NUTS_SEEDS' | 'SPICES'
  | 'DRINKS' | 'BAKING' | 'SNACKS' | 'READY_MEALS' | 'SPECIALTY';

export type GrocerySubcategory =
  // Protein subcategories
  | 'PROTEIN_POULTRY' | 'PROTEIN_BEEF_PORK' | 'PROTEIN_FISH'
  | 'PROTEIN_EGGS' | 'PROTEIN_DELI' | 'PROTEIN_PLANT_BASED'
  // Carb subcategories
  | 'CARB_GRAINS' | 'CARB_PASTA' | 'CARB_BREAD' | 'CARB_BREAKFAST' | 'CARB_POTATOES'
  // Dairy subcategories
  | 'DAIRY_MILK' | 'DAIRY_YOGURT' | 'DAIRY_CHEESE' | 'DAIRY_OTHER'
  // Vegetable subcategories
  | 'VEG_FRESH' | 'VEG_FROZEN'
  // Fruit subcategories
  | 'FRUIT_FRESH' | 'FRUIT_FROZEN' | 'FRUIT_DRIED'
  // Legumes subcategories
  | 'LEGUME_DRY' | 'LEGUME_CANNED' | 'LEGUME_OTHER'
  // Oils & Sauces subcategories
  | 'OIL_COOKING' | 'OIL_CONDIMENTS' | 'OIL_SAUCES' | 'OIL_VINEGARS' | 'OIL_SPREADS'
  // Nuts & Seeds subcategories
  | 'NUT_RAW' | 'NUT_ROASTED' | 'SEED' | 'NUT_BUTTER'
  // Spices subcategories
  | 'SPICE_HERB' | 'SPICE_SPICE' | 'SPICE_SALT_PEPPER' | 'SPICE_BLEND'
  // Drinks subcategories
  | 'DRINK_JUICE' | 'DRINK_WATER' | 'DRINK_TEA_COFFEE' | 'DRINK_OTHER'
  // Baking subcategories
  | 'BAKING_FLOUR' | 'BAKING_SWEETENER' | 'BAKING_LEAVENING' | 'BAKING_OTHER'
  // Snacks subcategories
  | 'SNACK_CHOCOLATE' | 'SNACK_CHIPS' | 'SNACK_FRUIT' | 'SNACK_MIX' | 'SNACK_BARS'
  // Ready Meals subcategories
  | 'READY_FROZEN' | 'READY_INSTANT' | 'READY_CANNED'
  // Specialty subcategories
  | 'SPECIALTY_GLUTEN_FREE' | 'SPECIALTY_VEGAN' | 'SPECIALTY_ORGANIC'
  | 'SPECIALTY_PROTEIN' | 'SPECIALTY_LOW_FAT';

export interface GroceryItem {
  id: string;
  name: string;
  category: GroceryCategory;
  subcategory?: GrocerySubcategory | null;
  packagePrice: number;
  packageSize: number;
  packageUnit: string;
  difficulty: CookingDifficulty;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryInfo {
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

export const CATEGORY_INFO: Record<GroceryCategory, CategoryInfo> = {
  PROTEINS: { label: 'Proteins', icon: '🍖', color: 'text-red-600', bgColor: 'bg-red-100' },
  CARBS: { label: 'Carbs', icon: '🍞', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  DAIRY: { label: 'Dairy', icon: '🥛', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  VEGETABLES: { label: 'Vegetables', icon: '🥦', color: 'text-green-600', bgColor: 'bg-green-100' },
  FRUITS: { label: 'Fruits', icon: '🍎', color: 'text-pink-600', bgColor: 'bg-pink-100' },
  LEGUMES_CANNED: { label: 'Legumes & Canned', icon: '🫘', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  OILS_SAUCES: { label: 'Oils & Sauces', icon: '🫒', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  NUTS_SEEDS: { label: 'Nuts & Seeds', icon: '🥜', color: 'text-amber-700', bgColor: 'bg-amber-50' },
  SPICES: { label: 'Spices', icon: '🧂', color: 'text-rose-600', bgColor: 'bg-rose-100' },
  DRINKS: { label: 'Drinks', icon: '🧃', color: 'text-cyan-600', bgColor: 'bg-cyan-100' },
  BAKING: { label: 'Baking', icon: '🧁', color: 'text-purple-600', bgColor: 'bg-purple-100' },
  SNACKS: { label: 'Snacks', icon: '🍫', color: 'text-indigo-600', bgColor: 'bg-indigo-100' },
  READY_MEALS: { label: 'Ready Meals', icon: '🍕', color: 'text-teal-600', bgColor: 'bg-teal-100' },
  SPECIALTY: { label: 'Specialty', icon: '✨', color: 'text-violet-600', bgColor: 'bg-violet-100' },
};

export const SUBCATEGORY_LABELS: Record<GrocerySubcategory, string> = {
  PROTEIN_POULTRY: 'Poultry', PROTEIN_BEEF_PORK: 'Beef & Pork', PROTEIN_FISH: 'Fish & Seafood',
  PROTEIN_EGGS: 'Eggs', PROTEIN_DELI: 'Deli & Cold Cuts', PROTEIN_PLANT_BASED: 'Plant-Based',
  CARB_GRAINS: 'Grains', CARB_PASTA: 'Pasta & Noodles', CARB_BREAD: 'Bread & Bakery',
  CARB_BREAKFAST: 'Breakfast Cereals', CARB_POTATOES: 'Potatoes',
  DAIRY_MILK: 'Milk', DAIRY_YOGURT: 'Yogurt & Quark', DAIRY_CHEESE: 'Cheese', DAIRY_OTHER: 'Other Dairy',
  VEG_FRESH: 'Fresh Vegetables', VEG_FROZEN: 'Frozen Vegetables',
  FRUIT_FRESH: 'Fresh Fruits', FRUIT_FROZEN: 'Frozen Fruits', FRUIT_DRIED: 'Dried Fruits',
  LEGUME_DRY: 'Dry Legumes', LEGUME_CANNED: 'Canned Goods', LEGUME_OTHER: 'Other',
  OIL_COOKING: 'Cooking Oils', OIL_CONDIMENTS: 'Condiments', OIL_SAUCES: 'Sauces',
  OIL_VINEGARS: 'Vinegars', OIL_SPREADS: 'Spreads',
  NUT_RAW: 'Raw Nuts', NUT_ROASTED: 'Roasted Nuts', SEED: 'Seeds', NUT_BUTTER: 'Nut Butters',
  SPICE_HERB: 'Herbs', SPICE_SPICE: 'Spices', SPICE_SALT_PEPPER: 'Salt & Pepper', SPICE_BLEND: 'Blends',
  DRINK_JUICE: 'Juices', DRINK_WATER: 'Water', DRINK_TEA_COFFEE: 'Tea & Coffee', DRINK_OTHER: 'Other Drinks',
  BAKING_FLOUR: 'Flour', BAKING_SWEETENER: 'Sweeteners', BAKING_LEAVENING: 'Leavening', BAKING_OTHER: 'Other Baking',
  SNACK_CHOCOLATE: 'Chocolate', SNACK_CHIPS: 'Chips & Crisps', SNACK_FRUIT: 'Fruit Snacks',
  SNACK_MIX: 'Trail Mix', SNACK_BARS: 'Bars',
  READY_FROZEN: 'Frozen Meals', READY_INSTANT: 'Instant Meals', READY_CANNED: 'Canned Meals',
  SPECIALTY_GLUTEN_FREE: 'Gluten-Free', SPECIALTY_VEGAN: 'Vegan', SPECIALTY_ORGANIC: 'Organic',
  SPECIALTY_PROTEIN: 'High Protein', SPECIALTY_LOW_FAT: 'Low Fat',
};

export const CATEGORY_SUBCATEGORIES: Record<GroceryCategory, GrocerySubcategory[]> = {
  PROTEINS: ['PROTEIN_POULTRY', 'PROTEIN_BEEF_PORK', 'PROTEIN_FISH', 'PROTEIN_EGGS', 'PROTEIN_DELI', 'PROTEIN_PLANT_BASED'],
  CARBS: ['CARB_GRAINS', 'CARB_PASTA', 'CARB_BREAD', 'CARB_BREAKFAST', 'CARB_POTATOES'],
  DAIRY: ['DAIRY_MILK', 'DAIRY_YOGURT', 'DAIRY_CHEESE', 'DAIRY_OTHER'],
  VEGETABLES: ['VEG_FRESH', 'VEG_FROZEN'],
  FRUITS: ['FRUIT_FRESH', 'FRUIT_FROZEN', 'FRUIT_DRIED'],
  LEGUMES_CANNED: ['LEGUME_DRY', 'LEGUME_CANNED', 'LEGUME_OTHER'],
  OILS_SAUCES: ['OIL_COOKING', 'OIL_CONDIMENTS', 'OIL_SAUCES', 'OIL_VINEGARS', 'OIL_SPREADS'],
  NUTS_SEEDS: ['NUT_RAW', 'NUT_ROASTED', 'SEED', 'NUT_BUTTER'],
  SPICES: ['SPICE_HERB', 'SPICE_SPICE', 'SPICE_SALT_PEPPER', 'SPICE_BLEND'],
  DRINKS: ['DRINK_JUICE', 'DRINK_WATER', 'DRINK_TEA_COFFEE', 'DRINK_OTHER'],
  BAKING: ['BAKING_FLOUR', 'BAKING_SWEETENER', 'BAKING_LEAVENING', 'BAKING_OTHER'],
  SNACKS: ['SNACK_CHOCOLATE', 'SNACK_CHIPS', 'SNACK_FRUIT', 'SNACK_MIX', 'SNACK_BARS'],
  READY_MEALS: ['READY_FROZEN', 'READY_INSTANT', 'READY_CANNED'],
  SPECIALTY: ['SPECIALTY_GLUTEN_FREE', 'SPECIALTY_VEGAN', 'SPECIALTY_ORGANIC', 'SPECIALTY_PROTEIN', 'SPECIALTY_LOW_FAT'],
};

export interface GroceryStats {
  total: number;
  byCategory: { category: GroceryCategory; count: number }[];
  bySubcategory: { category: GroceryCategory; subcategory: GrocerySubcategory | null; count: number }[];
}
