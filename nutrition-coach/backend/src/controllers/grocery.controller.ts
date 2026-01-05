import { Response } from 'express';
import { z } from 'zod';
import { AuthRequest } from '../middleware/auth';
import { prisma } from '../config/database';

// All category and subcategory enums for validation
const groceryCategoryEnum = z.enum([
    'PROTEINS', 'CARBS', 'DAIRY', 'VEGETABLES', 'FRUITS',
    'LEGUMES_CANNED', 'OILS_SAUCES', 'NUTS_SEEDS', 'SPICES',
    'DRINKS', 'BAKING', 'SNACKS', 'READY_MEALS', 'SPECIALTY'
]);

const grocerySubcategoryEnum = z.enum([
    // Protein subcategories
    'PROTEIN_POULTRY', 'PROTEIN_BEEF_PORK', 'PROTEIN_FISH',
    'PROTEIN_EGGS', 'PROTEIN_DELI', 'PROTEIN_PLANT_BASED',
    // Carb subcategories
    'CARB_GRAINS', 'CARB_PASTA', 'CARB_BREAD', 'CARB_BREAKFAST', 'CARB_POTATOES',
    // Dairy subcategories
    'DAIRY_MILK', 'DAIRY_YOGURT', 'DAIRY_CHEESE', 'DAIRY_OTHER',
    // Vegetable subcategories
    'VEG_FRESH', 'VEG_FROZEN',
    // Fruit subcategories
    'FRUIT_FRESH', 'FRUIT_FROZEN', 'FRUIT_DRIED',
    // Legumes & Canned subcategories
    'LEGUME_DRY', 'LEGUME_CANNED', 'LEGUME_OTHER',
    // Oils & Sauces subcategories
    'OIL_COOKING', 'OIL_CONDIMENTS', 'OIL_SAUCES', 'OIL_VINEGARS', 'OIL_SPREADS',
    // Nuts & Seeds subcategories
    'NUT_RAW', 'NUT_ROASTED', 'SEED', 'NUT_BUTTER',
    // Spices subcategories
    'SPICE_HERB', 'SPICE_SPICE', 'SPICE_SALT_PEPPER', 'SPICE_BLEND',
    // Drinks subcategories
    'DRINK_JUICE', 'DRINK_WATER', 'DRINK_TEA_COFFEE', 'DRINK_OTHER',
    // Baking subcategories
    'BAKING_FLOUR', 'BAKING_SWEETENER', 'BAKING_LEAVENING', 'BAKING_OTHER',
    // Snacks subcategories
    'SNACK_CHOCOLATE', 'SNACK_CHIPS', 'SNACK_FRUIT', 'SNACK_MIX', 'SNACK_BARS',
    // Ready Meals subcategories
    'READY_FROZEN', 'READY_INSTANT', 'READY_CANNED',
    // Specialty subcategories
    'SPECIALTY_GLUTEN_FREE', 'SPECIALTY_VEGAN', 'SPECIALTY_ORGANIC',
    'SPECIALTY_PROTEIN', 'SPECIALTY_LOW_FAT'
]);

const groceryItemSchema = z.object({
    name: z.string().min(1),
    category: groceryCategoryEnum,
    subcategory: grocerySubcategoryEnum.optional().nullable(),
    packagePrice: z.number().positive(),
    packageSize: z.number().positive(),
    packageUnit: z.string().min(1),
    difficulty: z.enum(['NO_COOKING', 'VERY_EASY', 'EASY', 'MEDIUM', 'COMPLEX']),
});

export class GroceryController {
    /**
     * POST /api/grocery - Create grocery item
     */
    async create(req: AuthRequest, res: Response): Promise<void> {
        try {
            const userId = req.userId!;
            const data = groceryItemSchema.parse(req.body);

            const item = await prisma.groceryItem.create({
                data: {
                    userId,
                    name: data.name,
                    category: data.category as any,
                    subcategory: data.subcategory as any || null,
                    packagePrice: data.packagePrice,
                    packageSize: data.packageSize,
                    packageUnit: data.packageUnit,
                    difficulty: data.difficulty as any,
                },
            });

            res.status(201).json(item);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: 'Validation error', details: error.errors });
                return;
            }
            throw error;
        }
    }

    /**
     * GET /api/grocery - List user's grocery items with optional filtering
     */
    async list(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.userId!;
        const { category, subcategory, search, difficulty } = req.query;

        // Build where clause with filters
        const where: any = { userId };

        if (category && typeof category === 'string') {
            where.category = category;
        }

        if (subcategory && typeof subcategory === 'string') {
            where.subcategory = subcategory;
        }

        if (difficulty && typeof difficulty === 'string') {
            where.difficulty = difficulty;
        }

        if (search && typeof search === 'string') {
            where.name = {
                contains: search,
                mode: 'insensitive',
            };
        }

        const items = await prisma.groceryItem.findMany({
            where,
            orderBy: [
                { category: 'asc' },
                { subcategory: 'asc' },
                { name: 'asc' },
            ],
        });

        res.json(items);
    }

    /**
     * GET /api/grocery/stats - Get category statistics
     */
    async getStats(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.userId!;

        const categoryStats = await prisma.groceryItem.groupBy({
            by: ['category'],
            where: { userId },
            _count: { id: true },
        });

        const subcategoryStats = await prisma.groceryItem.groupBy({
            by: ['category', 'subcategory'],
            where: { userId },
            _count: { id: true },
        });

        const totalItems = await prisma.groceryItem.count({
            where: { userId },
        });

        res.json({
            total: totalItems,
            byCategory: categoryStats.map(s => ({
                category: s.category,
                count: s._count.id,
            })),
            bySubcategory: subcategoryStats.map(s => ({
                category: s.category,
                subcategory: s.subcategory,
                count: s._count.id,
            })),
        });
    }

    /**
     * GET /api/grocery/:id - Get single grocery item
     */
    async get(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.userId!;
        const { id } = req.params;

        const item = await prisma.groceryItem.findFirst({
            where: { id, userId },
        });

        if (!item) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }

        res.json(item);
    }

    /**
     * PATCH /api/grocery/:id - Update grocery item
     */
    async update(req: AuthRequest, res: Response): Promise<void> {
        try {
            const userId = req.userId!;
            const { id } = req.params;
            const data = groceryItemSchema.partial().parse(req.body);

            const existing = await prisma.groceryItem.findFirst({
                where: { id, userId },
            });

            if (!existing) {
                res.status(404).json({ error: 'Item not found' });
                return;
            }

            const updateData: any = { ...data };
            if (data.category) updateData.category = data.category as any;
            if (data.subcategory) updateData.subcategory = data.subcategory as any;
            if (data.difficulty) updateData.difficulty = data.difficulty as any;

            const item = await prisma.groceryItem.update({
                where: { id },
                data: updateData,
            });

            res.json(item);
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.status(400).json({ error: 'Validation error', details: error.errors });
                return;
            }
            throw error;
        }
    }

    /**
     * DELETE /api/grocery/:id - Delete grocery item
     */
    async delete(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.userId!;
        const { id } = req.params;

        const existing = await prisma.groceryItem.findFirst({
            where: { id, userId },
        });

        if (!existing) {
            res.status(404).json({ error: 'Item not found' });
            return;
        }

        await prisma.groceryItem.delete({ where: { id } });
        res.status(204).send();
    }

    /**
     * DELETE /api/grocery - Delete all grocery items for user
     */
    async deleteAll(req: AuthRequest, res: Response): Promise<void> {
        const userId = req.userId!;

        const result = await prisma.groceryItem.deleteMany({
            where: { userId },
        });

        res.json({ deleted: result.count });
    }
}

export const groceryController = new GroceryController();
