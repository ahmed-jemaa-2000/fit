// Additional grocery items Part 2 - Vegetables, Fruits, Legumes, Oils, Nuts, Spices, Drinks, Baking, Snacks, Ready Meals, Specialty

interface GroceryItemData {
    name: string;
    category: string;
    subcategory: string | null;
    packagePrice: number;
    packageSize: number;
    packageUnit: string;
    difficulty: string;
}

export const groceryItemsPart2: GroceryItemData[] = [
    // VEGETABLES - Fresh
    { name: 'Tomatoes', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 2.19, packageSize: 650, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cherry Tomatoes', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Onions Yellow', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.49, packageSize: 2000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Onions Red', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.99, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Garlic', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.29, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Carrots', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.11, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Bell Peppers Mixed', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 2.69, packageSize: 1000, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Bell Pepper Red', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'EASY' },
    { name: 'Cucumber', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.79, packageSize: 1, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Zucchini', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.99, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Eggplant', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 3.99, packageSize: 1000, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Broccoli', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.95, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Cauliflower', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.49, packageSize: 1, packageUnit: 'pieces', difficulty: 'EASY' },
    { name: 'Spinach Fresh', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.49, packageSize: 250, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Lettuce Iceberg', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Lettuce Mix', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.29, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Arugula', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.49, packageSize: 125, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Mushrooms White', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.49, packageSize: 250, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Mushrooms Champignon', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.79, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Avocado', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.29, packageSize: 2, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Cabbage White', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'EASY' },
    { name: 'Cabbage Red', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.29, packageSize: 1, packageUnit: 'pieces', difficulty: 'EASY' },
    { name: 'Leek', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'EASY' },
    { name: 'Celery', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.49, packageSize: 1, packageUnit: 'pieces', difficulty: 'EASY' },
    { name: 'Asparagus Green', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 3.99, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Green Beans Fresh', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 2.49, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Corn on Cob', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 1.99, packageSize: 2, packageUnit: 'pieces', difficulty: 'EASY' },
    { name: 'Ginger Fresh', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.99, packageSize: 100, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Radishes', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.79, packageSize: 1, packageUnit: 'bunch', difficulty: 'NO_COOKING' },
    { name: 'Spring Onions', category: 'VEGETABLES', subcategory: 'VEG_FRESH', packagePrice: 0.79, packageSize: 1, packageUnit: 'bunch', difficulty: 'NO_COOKING' },

    // VEGETABLES - Frozen
    { name: 'Frozen Peas', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 1.29, packageSize: 750, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Frozen Spinach', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 0.99, packageSize: 450, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Frozen Mixed Veggies', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 1.49, packageSize: 1000, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Frozen Broccoli', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 1.29, packageSize: 750, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Frozen Green Beans', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 1.29, packageSize: 750, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Frozen Corn', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 1.19, packageSize: 750, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Frozen Stir-Fry Mix', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 1.99, packageSize: 750, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Frozen Cauliflower', category: 'VEGETABLES', subcategory: 'VEG_FROZEN', packagePrice: 1.49, packageSize: 750, packageUnit: 'g', difficulty: 'VERY_EASY' },

    // FRUITS - Fresh
    { name: 'Bananas', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 1.39, packageSize: 1000, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Apples', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.20, packageSize: 1000, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Oranges', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 1.99, packageSize: 1000, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Grapes Red', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Grapes White', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.79, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Kiwi', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 1.99, packageSize: 6, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Mango', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 1.49, packageSize: 1, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Pineapple', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 1.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Strawberries', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Blueberries', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.49, packageSize: 125, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Raspberries', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.79, packageSize: 125, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Lemons', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 0.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Limes', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 0.99, packageSize: 3, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Pears', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.49, packageSize: 1000, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Plums', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 2.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Watermelon', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 3.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Melon Cantaloupe', category: 'FRUITS', subcategory: 'FRUIT_FRESH', packagePrice: 1.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'NO_COOKING' },

    // FRUITS - Frozen
    { name: 'Berries Mixed Frozen', category: 'FRUITS', subcategory: 'FRUIT_FROZEN', packagePrice: 2.49, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Strawberries Frozen', category: 'FRUITS', subcategory: 'FRUIT_FROZEN', packagePrice: 2.29, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Mango Frozen', category: 'FRUITS', subcategory: 'FRUIT_FROZEN', packagePrice: 2.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Raspberries Frozen', category: 'FRUITS', subcategory: 'FRUIT_FROZEN', packagePrice: 2.79, packageSize: 300, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Blueberries Frozen', category: 'FRUITS', subcategory: 'FRUIT_FROZEN', packagePrice: 2.99, packageSize: 300, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Tropical Mix Frozen', category: 'FRUITS', subcategory: 'FRUIT_FROZEN', packagePrice: 2.79, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // FRUITS - Dried
    { name: 'Raisins', category: 'FRUITS', subcategory: 'FRUIT_DRIED', packagePrice: 1.49, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Dates Medjool', category: 'FRUITS', subcategory: 'FRUIT_DRIED', packagePrice: 3.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Dried Apricots', category: 'FRUITS', subcategory: 'FRUIT_DRIED', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Dried Cranberries', category: 'FRUITS', subcategory: 'FRUIT_DRIED', packagePrice: 2.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Dried Figs', category: 'FRUITS', subcategory: 'FRUIT_DRIED', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Dried Mango', category: 'FRUITS', subcategory: 'FRUIT_DRIED', packagePrice: 2.79, packageSize: 100, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Prunes', category: 'FRUITS', subcategory: 'FRUIT_DRIED', packagePrice: 1.99, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // LEGUMES - Canned
    { name: 'Chickpeas Canned', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.99, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Black Beans Canned', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.99, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'White Beans Canned', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.99, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Kidney Beans Canned', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.99, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Corn Canned', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.79, packageSize: 340, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Canned Tomatoes Whole', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.49, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Canned Tomatoes Diced', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.59, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Tomato Paste', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.79, packageSize: 200, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Peas Canned', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_CANNED', packagePrice: 0.79, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // LEGUMES - Dry
    { name: 'Lentils Green', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_DRY', packagePrice: 1.49, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Lentils Red', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_DRY', packagePrice: 1.99, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Lentils Brown', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_DRY', packagePrice: 1.79, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Chickpeas Dry', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_DRY', packagePrice: 1.99, packageSize: 500, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Black Beans Dry', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_DRY', packagePrice: 1.99, packageSize: 500, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'White Beans Dry', category: 'LEGUMES_CANNED', subcategory: 'LEGUME_DRY', packagePrice: 1.79, packageSize: 500, packageUnit: 'g', difficulty: 'MEDIUM' },

    // OILS & SAUCES - Cooking Oils
    { name: 'Olive Oil Extra Virgin', category: 'OILS_SAUCES', subcategory: 'OIL_COOKING', packagePrice: 5.99, packageSize: 500, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Olive Oil Light', category: 'OILS_SAUCES', subcategory: 'OIL_COOKING', packagePrice: 4.99, packageSize: 750, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Sunflower Oil', category: 'OILS_SAUCES', subcategory: 'OIL_COOKING', packagePrice: 1.79, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Coconut Oil', category: 'OILS_SAUCES', subcategory: 'OIL_COOKING', packagePrice: 3.99, packageSize: 500, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Rapeseed Oil', category: 'OILS_SAUCES', subcategory: 'OIL_COOKING', packagePrice: 2.49, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Sesame Oil', category: 'OILS_SAUCES', subcategory: 'OIL_COOKING', packagePrice: 2.99, packageSize: 250, packageUnit: 'ml', difficulty: 'NO_COOKING' },

    // OILS & SAUCES - Condiments
    { name: 'Soy Sauce', category: 'OILS_SAUCES', subcategory: 'OIL_CONDIMENTS', packagePrice: 1.49, packageSize: 250, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Mustard Dijon', category: 'OILS_SAUCES', subcategory: 'OIL_CONDIMENTS', packagePrice: 0.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Mustard Classic', category: 'OILS_SAUCES', subcategory: 'OIL_CONDIMENTS', packagePrice: 0.79, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Ketchup', category: 'OILS_SAUCES', subcategory: 'OIL_CONDIMENTS', packagePrice: 1.29, packageSize: 500, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Mayonnaise', category: 'OILS_SAUCES', subcategory: 'OIL_CONDIMENTS', packagePrice: 1.49, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Hot Sauce Sriracha', category: 'OILS_SAUCES', subcategory: 'OIL_CONDIMENTS', packagePrice: 2.99, packageSize: 250, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Worcestershire Sauce', category: 'OILS_SAUCES', subcategory: 'OIL_CONDIMENTS', packagePrice: 1.99, packageSize: 150, packageUnit: 'ml', difficulty: 'NO_COOKING' },

    // OILS & SAUCES - Cooking Sauces
    { name: 'Tomato Sauce Passata', category: 'OILS_SAUCES', subcategory: 'OIL_SAUCES', packagePrice: 0.99, packageSize: 500, packageUnit: 'ml', difficulty: 'EASY' },
    { name: 'Pesto Green', category: 'OILS_SAUCES', subcategory: 'OIL_SAUCES', packagePrice: 1.99, packageSize: 190, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Pesto Red', category: 'OILS_SAUCES', subcategory: 'OIL_SAUCES', packagePrice: 1.99, packageSize: 190, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Curry Paste Red', category: 'OILS_SAUCES', subcategory: 'OIL_SAUCES', packagePrice: 1.99, packageSize: 200, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Curry Paste Green', category: 'OILS_SAUCES', subcategory: 'OIL_SAUCES', packagePrice: 1.99, packageSize: 200, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Coconut Milk', category: 'OILS_SAUCES', subcategory: 'OIL_SAUCES', packagePrice: 1.49, packageSize: 400, packageUnit: 'ml', difficulty: 'EASY' },
    { name: 'Teriyaki Sauce', category: 'OILS_SAUCES', subcategory: 'OIL_SAUCES', packagePrice: 2.49, packageSize: 250, packageUnit: 'ml', difficulty: 'EASY' },

    // OILS & SAUCES - Vinegars
    { name: 'Balsamic Vinegar', category: 'OILS_SAUCES', subcategory: 'OIL_VINEGARS', packagePrice: 1.99, packageSize: 250, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Apple Cider Vinegar', category: 'OILS_SAUCES', subcategory: 'OIL_VINEGARS', packagePrice: 1.49, packageSize: 500, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'White Wine Vinegar', category: 'OILS_SAUCES', subcategory: 'OIL_VINEGARS', packagePrice: 1.29, packageSize: 500, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Rice Vinegar', category: 'OILS_SAUCES', subcategory: 'OIL_VINEGARS', packagePrice: 1.99, packageSize: 250, packageUnit: 'ml', difficulty: 'NO_COOKING' },

    // OILS & SAUCES - Spreads
    { name: 'Hummus', category: 'OILS_SAUCES', subcategory: 'OIL_SPREADS', packagePrice: 1.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Peanut Butter', category: 'OILS_SAUCES', subcategory: 'OIL_SPREADS', packagePrice: 1.99, packageSize: 350, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Almond Butter', category: 'OILS_SAUCES', subcategory: 'OIL_SPREADS', packagePrice: 4.99, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Tahini', category: 'OILS_SAUCES', subcategory: 'OIL_SPREADS', packagePrice: 2.99, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Nutella', category: 'OILS_SAUCES', subcategory: 'OIL_SPREADS', packagePrice: 3.49, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Jam Strawberry', category: 'OILS_SAUCES', subcategory: 'OIL_SPREADS', packagePrice: 1.29, packageSize: 450, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // NUTS & SEEDS
    { name: 'Almonds Raw', category: 'NUTS_SEEDS', subcategory: 'NUT_RAW', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Walnuts Raw', category: 'NUTS_SEEDS', subcategory: 'NUT_RAW', packagePrice: 2.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cashews Raw', category: 'NUTS_SEEDS', subcategory: 'NUT_RAW', packagePrice: 3.49, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Hazelnuts Raw', category: 'NUTS_SEEDS', subcategory: 'NUT_RAW', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Peanuts Roasted', category: 'NUTS_SEEDS', subcategory: 'NUT_ROASTED', packagePrice: 1.49, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Mixed Nuts Roasted', category: 'NUTS_SEEDS', subcategory: 'NUT_ROASTED', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cashews Salted', category: 'NUTS_SEEDS', subcategory: 'NUT_ROASTED', packagePrice: 3.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Chia Seeds', category: 'NUTS_SEEDS', subcategory: 'SEED', packagePrice: 2.49, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Sunflower Seeds', category: 'NUTS_SEEDS', subcategory: 'SEED', packagePrice: 0.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Pumpkin Seeds', category: 'NUTS_SEEDS', subcategory: 'SEED', packagePrice: 1.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Flax Seeds', category: 'NUTS_SEEDS', subcategory: 'SEED', packagePrice: 1.49, packageSize: 250, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Hemp Seeds', category: 'NUTS_SEEDS', subcategory: 'SEED', packagePrice: 3.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Sesame Seeds', category: 'NUTS_SEEDS', subcategory: 'SEED', packagePrice: 1.29, packageSize: 150, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // SPICES - Herbs
    { name: 'Basil Dried', category: 'SPICES', subcategory: 'SPICE_HERB', packagePrice: 0.99, packageSize: 25, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Oregano Dried', category: 'SPICES', subcategory: 'SPICE_HERB', packagePrice: 0.99, packageSize: 25, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Thyme Dried', category: 'SPICES', subcategory: 'SPICE_HERB', packagePrice: 0.99, packageSize: 25, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Rosemary Dried', category: 'SPICES', subcategory: 'SPICE_HERB', packagePrice: 0.99, packageSize: 25, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Parsley Dried', category: 'SPICES', subcategory: 'SPICE_HERB', packagePrice: 0.89, packageSize: 25, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Dill Dried', category: 'SPICES', subcategory: 'SPICE_HERB', packagePrice: 0.99, packageSize: 20, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Bay Leaves', category: 'SPICES', subcategory: 'SPICE_HERB', packagePrice: 1.29, packageSize: 15, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // SPICES - Spices
    { name: 'Paprika Sweet', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.29, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Paprika Smoked', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.99, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cumin Ground', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.49, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Turmeric Ground', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.49, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Cinnamon Ground', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.29, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Ginger Ground', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.49, packageSize: 40, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Chili Flakes', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.29, packageSize: 40, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Curry Powder', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.79, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Nutmeg Ground', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.99, packageSize: 30, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Coriander Ground', category: 'SPICES', subcategory: 'SPICE_SPICE', packagePrice: 1.29, packageSize: 40, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // SPICES - Salt & Pepper
    { name: 'Salt Table', category: 'SPICES', subcategory: 'SPICE_SALT_PEPPER', packagePrice: 0.49, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Salt Sea', category: 'SPICES', subcategory: 'SPICE_SALT_PEPPER', packagePrice: 0.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Black Pepper Ground', category: 'SPICES', subcategory: 'SPICE_SALT_PEPPER', packagePrice: 1.49, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Black Pepper Whole', category: 'SPICES', subcategory: 'SPICE_SALT_PEPPER', packagePrice: 1.99, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // SPICES - Blends
    { name: 'Italian Seasoning', category: 'SPICES', subcategory: 'SPICE_BLEND', packagePrice: 1.49, packageSize: 40, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Taco Seasoning', category: 'SPICES', subcategory: 'SPICE_BLEND', packagePrice: 0.99, packageSize: 35, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Chicken Seasoning', category: 'SPICES', subcategory: 'SPICE_BLEND', packagePrice: 1.29, packageSize: 40, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Garam Masala', category: 'SPICES', subcategory: 'SPICE_BLEND', packagePrice: 1.99, packageSize: 40, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Garlic Powder', category: 'SPICES', subcategory: 'SPICE_BLEND', packagePrice: 1.29, packageSize: 60, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Onion Powder', category: 'SPICES', subcategory: 'SPICE_BLEND', packagePrice: 1.29, packageSize: 60, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // DRINKS
    { name: 'Orange Juice', category: 'DRINKS', subcategory: 'DRINK_JUICE', packagePrice: 1.29, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Apple Juice', category: 'DRINKS', subcategory: 'DRINK_JUICE', packagePrice: 0.99, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Multivitamin Juice', category: 'DRINKS', subcategory: 'DRINK_JUICE', packagePrice: 1.49, packageSize: 1000, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Mineral Water', category: 'DRINKS', subcategory: 'DRINK_WATER', packagePrice: 0.19, packageSize: 1500, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Sparkling Water', category: 'DRINKS', subcategory: 'DRINK_WATER', packagePrice: 0.25, packageSize: 1500, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Coffee Ground', category: 'DRINKS', subcategory: 'DRINK_TEA_COFFEE', packagePrice: 4.99, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Coffee Instant', category: 'DRINKS', subcategory: 'DRINK_TEA_COFFEE', packagePrice: 3.99, packageSize: 200, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Tea Black Bags', category: 'DRINKS', subcategory: 'DRINK_TEA_COFFEE', packagePrice: 1.49, packageSize: 25, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Tea Green Bags', category: 'DRINKS', subcategory: 'DRINK_TEA_COFFEE', packagePrice: 1.69, packageSize: 20, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Tea Herbal Mix', category: 'DRINKS', subcategory: 'DRINK_TEA_COFFEE', packagePrice: 1.29, packageSize: 20, packageUnit: 'pieces', difficulty: 'VERY_EASY' },

    // BAKING
    { name: 'Flour All Purpose', category: 'BAKING', subcategory: 'BAKING_FLOUR', packagePrice: 0.59, packageSize: 1000, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Flour Whole Wheat', category: 'BAKING', subcategory: 'BAKING_FLOUR', packagePrice: 0.79, packageSize: 1000, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Flour Bread', category: 'BAKING', subcategory: 'BAKING_FLOUR', packagePrice: 0.89, packageSize: 1000, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Cornstarch', category: 'BAKING', subcategory: 'BAKING_FLOUR', packagePrice: 0.79, packageSize: 400, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Sugar White', category: 'BAKING', subcategory: 'BAKING_SWEETENER', packagePrice: 0.89, packageSize: 1000, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Sugar Brown', category: 'BAKING', subcategory: 'BAKING_SWEETENER', packagePrice: 1.29, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Honey', category: 'BAKING', subcategory: 'BAKING_SWEETENER', packagePrice: 3.99, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Maple Syrup', category: 'BAKING', subcategory: 'BAKING_SWEETENER', packagePrice: 5.99, packageSize: 250, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Agave Syrup', category: 'BAKING', subcategory: 'BAKING_SWEETENER', packagePrice: 2.99, packageSize: 350, packageUnit: 'ml', difficulty: 'NO_COOKING' },
    { name: 'Baking Powder', category: 'BAKING', subcategory: 'BAKING_LEAVENING', packagePrice: 0.59, packageSize: 100, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Baking Soda', category: 'BAKING', subcategory: 'BAKING_LEAVENING', packagePrice: 0.49, packageSize: 100, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Yeast Dry', category: 'BAKING', subcategory: 'BAKING_LEAVENING', packagePrice: 0.99, packageSize: 7, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Vanilla Extract', category: 'BAKING', subcategory: 'BAKING_OTHER', packagePrice: 2.49, packageSize: 50, packageUnit: 'ml', difficulty: 'MEDIUM' },
    { name: 'Cocoa Powder', category: 'BAKING', subcategory: 'BAKING_OTHER', packagePrice: 1.99, packageSize: 250, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Chocolate Chips', category: 'BAKING', subcategory: 'BAKING_OTHER', packagePrice: 1.79, packageSize: 200, packageUnit: 'g', difficulty: 'MEDIUM' },

    // SNACKS
    { name: 'Dark Chocolate 70%', category: 'SNACKS', subcategory: 'SNACK_CHOCOLATE', packagePrice: 1.29, packageSize: 100, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Milk Chocolate', category: 'SNACKS', subcategory: 'SNACK_CHOCOLATE', packagePrice: 0.99, packageSize: 100, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Potato Chips Classic', category: 'SNACKS', subcategory: 'SNACK_CHIPS', packagePrice: 1.49, packageSize: 175, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Tortilla Chips', category: 'SNACKS', subcategory: 'SNACK_CHIPS', packagePrice: 1.29, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Rice Cakes', category: 'SNACKS', subcategory: 'SNACK_CHIPS', packagePrice: 0.99, packageSize: 130, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Popcorn Kernels', category: 'SNACKS', subcategory: 'SNACK_CHIPS', packagePrice: 1.29, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Trail Mix', category: 'SNACKS', subcategory: 'SNACK_MIX', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Protein Bar', category: 'SNACKS', subcategory: 'SNACK_BARS', packagePrice: 1.99, packageSize: 60, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Granola Bar', category: 'SNACKS', subcategory: 'SNACK_BARS', packagePrice: 1.49, packageSize: 5, packageUnit: 'pieces', difficulty: 'NO_COOKING' },
    { name: 'Energy Bar', category: 'SNACKS', subcategory: 'SNACK_BARS', packagePrice: 1.79, packageSize: 50, packageUnit: 'g', difficulty: 'NO_COOKING' },

    // READY MEALS
    { name: 'Frozen Pizza Margherita', category: 'READY_MEALS', subcategory: 'READY_FROZEN', packagePrice: 1.79, packageSize: 1, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Frozen Pizza Salami', category: 'READY_MEALS', subcategory: 'READY_FROZEN', packagePrice: 1.99, packageSize: 1, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Frozen Lasagna', category: 'READY_MEALS', subcategory: 'READY_FROZEN', packagePrice: 2.99, packageSize: 400, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Frozen Fish & Chips', category: 'READY_MEALS', subcategory: 'READY_FROZEN', packagePrice: 2.49, packageSize: 400, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Instant Noodles', category: 'READY_MEALS', subcategory: 'READY_INSTANT', packagePrice: 0.49, packageSize: 1, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Instant Soup Cup', category: 'READY_MEALS', subcategory: 'READY_INSTANT', packagePrice: 0.79, packageSize: 1, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Canned Soup Tomato', category: 'READY_MEALS', subcategory: 'READY_CANNED', packagePrice: 1.29, packageSize: 400, packageUnit: 'ml', difficulty: 'VERY_EASY' },
    { name: 'Canned Soup Chicken', category: 'READY_MEALS', subcategory: 'READY_CANNED', packagePrice: 1.49, packageSize: 400, packageUnit: 'ml', difficulty: 'VERY_EASY' },

    // SPECIALTY
    { name: 'Gluten-Free Pasta', category: 'SPECIALTY', subcategory: 'SPECIALTY_GLUTEN_FREE', packagePrice: 2.49, packageSize: 500, packageUnit: 'g', difficulty: 'VERY_EASY' },
    { name: 'Gluten-Free Bread', category: 'SPECIALTY', subcategory: 'SPECIALTY_GLUTEN_FREE', packagePrice: 2.99, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Gluten-Free Flour', category: 'SPECIALTY', subcategory: 'SPECIALTY_GLUTEN_FREE', packagePrice: 2.79, packageSize: 500, packageUnit: 'g', difficulty: 'MEDIUM' },
    { name: 'Vegan Cheese', category: 'SPECIALTY', subcategory: 'SPECIALTY_VEGAN', packagePrice: 2.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Vegan Yogurt', category: 'SPECIALTY', subcategory: 'SPECIALTY_VEGAN', packagePrice: 1.99, packageSize: 400, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Organic Eggs (10)', category: 'SPECIALTY', subcategory: 'SPECIALTY_ORGANIC', packagePrice: 3.99, packageSize: 10, packageUnit: 'pieces', difficulty: 'VERY_EASY' },
    { name: 'Organic Chicken Breast', category: 'SPECIALTY', subcategory: 'SPECIALTY_ORGANIC', packagePrice: 14.99, packageSize: 500, packageUnit: 'g', difficulty: 'EASY' },
    { name: 'Protein Powder Whey', category: 'SPECIALTY', subcategory: 'SPECIALTY_PROTEIN', packagePrice: 14.99, packageSize: 750, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Protein Powder Vegan', category: 'SPECIALTY', subcategory: 'SPECIALTY_PROTEIN', packagePrice: 16.99, packageSize: 750, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Low Fat Cheese', category: 'SPECIALTY', subcategory: 'SPECIALTY_LOW_FAT', packagePrice: 1.99, packageSize: 200, packageUnit: 'g', difficulty: 'NO_COOKING' },
    { name: 'Low Fat Yogurt', category: 'SPECIALTY', subcategory: 'SPECIALTY_LOW_FAT', packagePrice: 0.79, packageSize: 500, packageUnit: 'g', difficulty: 'NO_COOKING' },
];
