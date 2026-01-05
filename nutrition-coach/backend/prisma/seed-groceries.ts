// Seed script for grocery items with German/Lidl prices
// Run with: npx tsx prisma/seed-groceries.ts

import { PrismaClient } from '@prisma/client';
import { groceryItemsPart2 } from './grocery-items-part2';

const prisma = new PrismaClient();

interface GroceryItemData {
    name: string;
    category: string;
    subcategory: string | null;
    packagePrice: number;
    packageSize: number;
    packageUnit: string;
    difficulty: string;
}

// German Lidl prices 2025/2026 - Comprehensive grocery list
const groceryItems: GroceryItemData[] = [
    // ═══════════════════════════════════════════════════════════════
    // PROTEINS - 50+ items
    // ═══════════════════════════════════════════════════════════════

    // Poultry
    { name: 'Chicken Breast', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 7.32, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Chicken Thighs', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 5.00, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Chicken Wings XXL', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 4.49, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Chicken Drumsticks', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 3.99, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Whole Chicken', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 5.99, packageSize: 1200, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Turkey Breast', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 8.99, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Turkey Minced', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 4.69, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Duck Breast', category: 'PROTEINS', subcategory: 'PROTEIN_POULTRY', packagePrice: 9.99, packageSize: 400, packageUnit: 'g', difficulty: 'MEDIUM' },

    // Beef & Pork
    { name: 'Ground Beef', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 6.99, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Ground Beef Lean', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 7.99, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Beef Steak Rump', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 9.99, packageSize: 300, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Beef Steak Ribeye', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 14.99, packageSize: 350, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Beef Roast', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 12.99, packageSize: 1000, packageUnit: 'g', difficulty: 'COMPLEX' },
    { name: 'Beef Strips Stir-Fry', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 8.49, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Pork Schnitzel', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 3.99, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Pork Roast', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 4.99, packageSize: 1000, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Pork Chops', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 5.49, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Minced Pork', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 3.00, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Mixed Minced Meat', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 4.49, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Bacon Strips', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Pork Belly', category: 'PROTEINS', subcategory: 'PROTEIN_BEEF_PORK', packagePrice: 5.99, packageSize: 500, packageUnit: 'g', difficulty: 'MEDIUM' },

    // Fish & Seafood
    { name: 'Salmon Fillet Fresh', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 9.49, packageSize: 375, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Salmon Fillet Frozen', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 7.99, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Smoked Salmon', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 3.99, packageSize: 100, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Tuna Canned in Water', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 1.49, packageSize: 185, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Tuna Canned in Oil', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 1.69, packageSize: 185, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Sardines Canned', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 1.29, packageSize: 125, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Mackerel Canned', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 1.49, packageSize: 125, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Fish Sticks Frozen', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 2.99, packageSize: 450, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Cod Fillet Frozen', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 5.99, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Shrimp Frozen', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 5.99, packageSize: 225, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Pangasius Fillet', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 3.99, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Trout Smoked', category: 'PROTEINS', subcategory: 'PROTEIN_FISH', packagePrice: 4.49, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // Eggs
    { name: 'Eggs (10 pack)', category: 'PROTEINS', subcategory: 'PROTEIN_EGGS', packagePrice: 1.99, packageSize: 10, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Eggs Bio (12 pack)', category: 'PROTEINS', subcategory: 'PROTEIN_EGGS', packagePrice: 2.93, packageSize: 12, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Eggs Free Range (6 pack)', category: 'PROTEINS', subcategory: 'PROTEIN_EGGS', packagePrice: 1.79, packageSize: 6, packageUnit: 'pieces', difficulty: 'VERY_EASY' },

    // Deli & Cold Cuts
    { name: 'Ham Cooked Sliced', category: 'PROTEINS', subcategory: 'PROTEIN_DELI', packagePrice: 1.69, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Ham Smoked', category: 'PROTEINS', subcategory: 'PROTEIN_DELI', packagePrice: 2.29, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Salami', category: 'PROTEINS', subcategory: 'PROTEIN_DELI', packagePrice: 1.99, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Chicken Breast Sliced', category: 'PROTEINS', subcategory: 'PROTEIN_DELI', packagePrice: 2.49, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Turkey Breast Sliced', category: 'PROTEINS', subcategory: 'PROTEIN_DELI', packagePrice: 2.79, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Mortadella', category: 'PROTEINS', subcategory: 'PROTEIN_DELI', packagePrice: 1.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Leberwurst', category: 'PROTEINS', subcategory: 'PROTEIN_DELI', packagePrice: 1.29, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // Plant-Based Proteins
    { name: 'Tofu Natural', category: 'PROTEINS', subcategory: 'PROTEIN_PLANT_BASED', packagePrice: 1.99, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Tofu Smoked', category: 'PROTEINS', subcategory: 'PROTEIN_PLANT_BASED', packagePrice: 2.49, packageSize: 200, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Tempeh', category: 'PROTEINS', subcategory: 'PROTEIN_PLANT_BASED', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Seitan', category: 'PROTEINS', subcategory: 'PROTEIN_PLANT_BASED', packagePrice: 3.49, packageSize: 200, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Plant Burger Patties', category: 'PROTEINS', subcategory: 'PROTEIN_PLANT_BASED', packagePrice: 3.99, packageSize: 230, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Veggie Mince', category: 'PROTEINS', subcategory: 'PROTEIN_PLANT_BASED', packagePrice: 2.99, packageSize: 250, packageUnit: 'g', difficulty: 'EASY' },

    // ═══════════════════════════════════════════════════════════════
    // CARBS - 50+ items
    // ═══════════════════════════════════════════════════════════════

    // Grains
    { name: 'Rice Basmati', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 2.09, packageSize: 1000, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Rice Long Grain', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 1.49, packageSize: 1000, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Rice Jasmine', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 2.49, packageSize: 1000, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Rice Brown', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 1.99, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Rice Arborio (Risotto)', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 2.79, packageSize: 500, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Couscous', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 1.99, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Couscous Whole Wheat', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 2.29, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Quinoa White', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 2.99, packageSize: 400, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Quinoa Tricolor', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 3.49, packageSize: 400, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Bulgur', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 1.79, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Polenta', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 1.49, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Buckwheat', category: 'CARBS', subcategory: 'CARB_GRAINS', packagePrice: 2.29, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },

    // Pasta
    { name: 'Pasta Spaghetti', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 1.29, packageSize: 1000, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Pasta Penne', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 0.69, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Pasta Fusilli', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 0.69, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Pasta Farfalle', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 0.79, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Pasta Rigatoni', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 0.79, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Pasta Tagliatelle', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 1.19, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Pasta Whole Wheat', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 1.49, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Noodles Asian Egg', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 1.29, packageSize: 250, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Noodles Rice', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 1.99, packageSize: 400, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Noodles Udon', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 2.29, packageSize: 300, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Lasagna Sheets', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 1.29, packageSize: 500, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Gnocchi', category: 'CARBS', subcategory: 'CARB_PASTA', packagePrice: 1.49, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },

    // Bread
    { name: 'Bread Whole Wheat', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.29, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Bread Multigrain', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.49, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Bread Rye', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.59, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Baguette', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 0.79, packageSize: 1, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Bread Rolls (6 pack)', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.14, packageSize: 6, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Toast Bread White', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 0.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Toast Bread Whole Wheat', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.29, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Wraps Tortilla', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.49, packageSize: 6, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Wraps Whole Wheat', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.79, packageSize: 6, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Pita Bread', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.29, packageSize: 5, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Ciabatta', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.49, packageSize: 2, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Naan Bread', category: 'CARBS', subcategory: 'CARB_BREAD', packagePrice: 1.99, packageSize: 4, packageUnit: 'pieces', difficulty: 'VERY_EASY' },

    // Breakfast Cereals
    { name: 'Oatmeal Classic', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 0.80, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Oatmeal Instant', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 1.29, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Cornflakes', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 1.49, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Muesli Classic', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 1.99, packageSize: 750, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Muesli Fruit', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 2.49, packageSize: 750, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Granola Crunchy', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 2.49, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Granola Chocolate', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 2.79, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Bran Flakes', category: 'CARBS', subcategory: 'CARB_BREAKFAST', packagePrice: 1.79, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // Potatoes
    { name: 'Potatoes', category: 'CARBS', subcategory: 'CARB_POTATOES', packagePrice: 1.89, packageSize: 2500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Potatoes Baby', category: 'CARBS', subcategory: 'CARB_POTATOES', packagePrice: 2.29, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Sweet Potatoes', category: 'CARBS', subcategory: 'CARB_POTATOES', packagePrice: 2.49, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Potato Fries Frozen', category: 'CARBS', subcategory: 'CARB_POTATOES', packagePrice: 1.79, packageSize: 1000, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Potato Wedges Frozen', category: 'CARBS', subcategory: 'CARB_POTATOES', packagePrice: 1.99, packageSize: 750, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Mashed Potatoes Instant', category: 'CARBS', subcategory: 'CARB_POTATOES', packagePrice: 0.99, packageSize: 250, packageUnit: 'g', difficulty: 'VERY_EASY' },

    // ═══════════════════════════════════════════════════════════════
    // DAIRY - 35+ items
    // ═══════════════════════════════════════════════════════════════

    // Milk
    { name: 'Milk Fresh 3.5%', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 0.99, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Milk Fresh 1.5%', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 0.95, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Milk UHT 3.5%', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 0.85, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Milk UHT 1.5%', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 0.79, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Oat Milk', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 1.49, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Almond Milk', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 1.79, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Soy Milk', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 1.29, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Coconut Milk Drink', category: 'DAIRY', subcategory: 'DAIRY_MILK', packagePrice: 1.69, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },

    // Yogurt
    { name: 'Yogurt Natural', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 0.44, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Yogurt Greek Style', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 0.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Yogurt Greek 0% Fat', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 1.19, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Skyr Natural', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 1.29, packageSize: 450, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Skyr Vanilla', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 1.49, packageSize: 450, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Quark Low Fat', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 0.79, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Quark 40% Fat', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 0.99, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cottage Cheese', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 1.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Kefir', category: 'DAIRY', subcategory: 'DAIRY_YOGURT', packagePrice: 0.99, packageSize: 500, packageUnit: 'ml', difficulty: 'NO_COOKING' },

    // Cheese
    { name: 'Cheese Gouda Sliced', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 1.79, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Gouda Block', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 2.99, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Mozzarella', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 0.99, packageSize: 125, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Mozzarella Shredded', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 1.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Feta', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 2.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Parmesan', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 2.99, packageSize: 100, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Cheddar', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 2.29, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Emmental', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 2.49, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Grated Mix', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 1.79, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cheese Cream Spread', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 1.29, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Ricotta', category: 'DAIRY', subcategory: 'DAIRY_CHEESE', packagePrice: 1.99, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // Other Dairy
    { name: 'Butter', category: 'DAIRY', subcategory: 'DAIRY_OTHER', packagePrice: 2.49, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Butter Light', category: 'DAIRY', subcategory: 'DAIRY_OTHER', packagePrice: 1.99, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cream Fresh 30%', category: 'DAIRY', subcategory: 'DAIRY_OTHER', packagePrice: 0.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Whipping Cream', category: 'DAIRY', subcategory: 'DAIRY_OTHER', packagePrice: 1.29, packageSize: 200, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Sour Cream', category: 'DAIRY', subcategory: 'DAIRY_OTHER', packagePrice: 0.79, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Creme Fraiche', category: 'DAIRY', subcategory: 'DAIRY_OTHER', packagePrice: 0.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Mascarpone', category: 'DAIRY', subcategory: 'DAIRY_OTHER', packagePrice: 1.79, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
];

async function seedGroceries(userId: string) {
    console.log('🛒 Deleting existing grocery items...');
    await prisma.groceryItem.deleteMany({ where: { userId } });

    const allItems = [...groceryItems, ...groceryItemsPart2];
    console.log(`🛒 Seeding ${allItems.length} grocery items...`);

    let count = 0;
    for (const item of allItems) {
        await prisma.groceryItem.create({
            data: {
                userId,
                name: item.name,
                category: item.category as any,
                subcategory: item.subcategory as any,
                packagePrice: item.packagePrice,
                packageSize: item.packageSize,
                packageUnit: item.packageUnit,
                difficulty: item.difficulty as any,
            },
        });
        count++;
        if (count % 50 === 0) {
            console.log(`  ✓ Added ${count} items...`);
        }
    }

    console.log(`\n✅ Seeded ${count} grocery items!`);
}

async function main() {
    let userId = process.argv[2];

    if (!userId) {
        const user = await prisma.user.findFirst();
        if (!user) {
            console.log('No users found. Please create an account first.');
            process.exit(1);
        }
        userId = user.id;
        console.log(`Found user: ${user.name} (${user.email})`);
    }

    await seedGroceries(userId);
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
