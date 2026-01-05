import React, { useState, useMemo } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { groceryApi } from '../lib/api';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Select } from '../components/Select';
import { Modal } from '../components/Modal';
import {
    GroceryItem,
    GroceryCategory,
    GrocerySubcategory,
    CATEGORY_INFO,
    SUBCATEGORY_LABELS,
    CATEGORY_SUBCATEGORIES,
} from '../types';

const ALL_CATEGORIES: GroceryCategory[] = [
    'PROTEINS', 'CARBS', 'DAIRY', 'VEGETABLES', 'FRUITS',
    'LEGUMES_CANNED', 'OILS_SAUCES', 'NUTS_SEEDS', 'SPICES',
    'DRINKS', 'BAKING', 'SNACKS', 'READY_MEALS', 'SPECIALTY'
];

const defaultFormData = {
    name: '',
    category: 'PROTEINS' as GroceryCategory,
    subcategory: '' as string,
    packagePrice: '',
    packageSize: '',
    packageUnit: 'g',
    difficulty: 'EASY',
};

export default function GroceryPage() {
    const queryClient = useQueryClient();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState(defaultFormData);
    const [selectedCategory, setSelectedCategory] = useState<GroceryCategory | 'ALL'>('ALL');
    const [searchQuery, setSearchQuery] = useState('');

    const { data: groceryItems, isLoading } = useQuery({
        queryKey: ['grocery'],
        queryFn: () => groceryApi.list(),
    });

    const createMutation = useMutation({
        mutationFn: groceryApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grocery'] });
            setIsModalOpen(false);
            setFormData(defaultFormData);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: groceryApi.delete,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['grocery'] });
        },
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createMutation.mutate({
            name: formData.name,
            category: formData.category,
            subcategory: formData.subcategory || undefined,
            packagePrice: parseFloat(formData.packagePrice),
            packageSize: parseFloat(formData.packageSize),
            packageUnit: formData.packageUnit,
            difficulty: formData.difficulty,
        });
    };

    // Filter and group items
    const filteredItems = useMemo(() => {
        const items = groceryItems?.data || [];
        return items.filter((item: GroceryItem) => {
            const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
            const matchesSearch = !searchQuery ||
                item.name.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [groceryItems?.data, selectedCategory, searchQuery]);

    // Group items by category
    const groupedItems = useMemo(() => {
        const groups: Record<GroceryCategory, GroceryItem[]> = {} as any;
        ALL_CATEGORIES.forEach(cat => { groups[cat] = []; });

        filteredItems.forEach((item: GroceryItem) => {
            if (groups[item.category]) {
                groups[item.category].push(item);
            }
        });

        return groups;
    }, [filteredItems]);

    // Count items per category
    const categoryCounts = useMemo(() => {
        const counts: Record<GroceryCategory, number> = {} as any;
        ALL_CATEGORIES.forEach(cat => { counts[cat] = 0; });

        (groceryItems?.data || []).forEach((item: GroceryItem) => {
            if (counts[item.category] !== undefined) {
                counts[item.category]++;
            }
        });

        return counts;
    }, [groceryItems?.data]);

    const totalItems = groceryItems?.data?.length || 0;

    const getDifficultyLabel = (diff: string) => {
        const labels: Record<string, string> = {
            'NO_COOKING': '🥗 No cooking',
            'VERY_EASY': '⚡ Very easy',
            'EASY': '👍 Easy',
            'MEDIUM': '👨‍🍳 Medium',
            'COMPLEX': '🔥 Complex',
        };
        return labels[diff] || diff;
    };

    const getDifficultyColor = (diff: string) => {
        const colors: Record<string, string> = {
            'NO_COOKING': 'bg-green-100 text-green-800',
            'VERY_EASY': 'bg-blue-100 text-blue-800',
            'EASY': 'bg-yellow-100 text-yellow-800',
            'MEDIUM': 'bg-orange-100 text-orange-800',
            'COMPLEX': 'bg-red-100 text-red-800',
        };
        return colors[diff] || 'bg-gray-100 text-gray-800';
    };

    // Get subcategories for selected category in form
    const availableSubcategories = CATEGORY_SUBCATEGORIES[formData.category] || [];

    return (
        <div className="flex gap-6">
            {/* Category Sidebar */}
            <div className="w-64 flex-shrink-0">
                <Card>
                    <h3 className="font-bold text-lg mb-4">📁 Categories</h3>
                    <div className="space-y-1">
                        <button
                            onClick={() => setSelectedCategory('ALL')}
                            className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${selectedCategory === 'ALL'
                                    ? 'bg-blue-100 text-blue-800 font-medium'
                                    : 'hover:bg-gray-100'
                                }`}
                        >
                            <span>🏪 All Items</span>
                            <span className="text-sm bg-gray-200 px-2 py-0.5 rounded-full">
                                {totalItems}
                            </span>
                        </button>

                        <div className="border-t my-2"></div>

                        {ALL_CATEGORIES.map(cat => {
                            const info = CATEGORY_INFO[cat];
                            const count = categoryCounts[cat];
                            return (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${selectedCategory === cat
                                            ? `${info.bgColor} ${info.color} font-medium`
                                            : 'hover:bg-gray-100'
                                        }`}
                                >
                                    <span>{info.icon} {info.label}</span>
                                    {count > 0 && (
                                        <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                                            {count}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🛒 My Groceries</h1>
                        <p className="text-gray-600">
                            {totalItems} items across {ALL_CATEGORIES.filter(c => categoryCounts[c] > 0).length} categories
                        </p>
                    </div>
                    <Button variant="primary" onClick={() => setIsModalOpen(true)}>
                        + Add Item
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <Input
                            placeholder="🔍 Search groceries..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <Card>
                        <p className="text-center py-8 text-gray-500">Loading groceries...</p>
                    </Card>
                )}

                {/* Empty State */}
                {!isLoading && filteredItems.length === 0 && (
                    <Card>
                        <p className="text-gray-500 text-center py-8">
                            {searchQuery
                                ? `No items found matching "${searchQuery}"`
                                : selectedCategory !== 'ALL'
                                    ? `No items in ${CATEGORY_INFO[selectedCategory].label} yet`
                                    : 'No grocery items yet. Add your foods and AI will create budget-friendly meal plans!'
                            }
                        </p>
                    </Card>
                )}

                {/* Category Groups */}
                {selectedCategory === 'ALL' ? (
                    // Show all categories with items
                    ALL_CATEGORIES.map(cat => {
                        const items = groupedItems[cat];
                        if (items.length === 0) return null;

                        const info = CATEGORY_INFO[cat];
                        return (
                            <div key={cat} className="space-y-3">
                                <h2 className={`text-xl font-bold ${info.color} flex items-center gap-2`}>
                                    <span className="text-2xl">{info.icon}</span>
                                    {info.label}
                                    <span className="text-sm font-normal text-gray-500">
                                        ({items.length} items)
                                    </span>
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {items.map((item: GroceryItem) => (
                                        <GroceryCard
                                            key={item.id}
                                            item={item}
                                            onDelete={() => deleteMutation.mutate(item.id)}
                                            getDifficultyLabel={getDifficultyLabel}
                                            getDifficultyColor={getDifficultyColor}
                                        />
                                    ))}
                                </div>
                            </div>
                        );
                    })
                ) : (
                    // Show only selected category
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredItems.map((item: GroceryItem) => (
                            <GroceryCard
                                key={item.id}
                                item={item}
                                onDelete={() => deleteMutation.mutate(item.id)}
                                getDifficultyLabel={getDifficultyLabel}
                                getDifficultyColor={getDifficultyColor}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Add Item Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="🛒 Add Grocery Item">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Food Name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g., Chicken Breast, Eggs, Rice..."
                        required
                    />

                    {/* Category Selection */}
                    <div className="grid grid-cols-2 gap-3">
                        <Select
                            label="📁 Category"
                            value={formData.category}
                            onChange={(e) => setFormData({
                                ...formData,
                                category: e.target.value as GroceryCategory,
                                subcategory: '' // Reset subcategory when category changes
                            })}
                            options={ALL_CATEGORIES.map(cat => ({
                                value: cat,
                                label: `${CATEGORY_INFO[cat].icon} ${CATEGORY_INFO[cat].label}`
                            }))}
                        />
                        <Select
                            label="📂 Subcategory"
                            value={formData.subcategory}
                            onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                            options={[
                                { value: '', label: '— Optional —' },
                                ...availableSubcategories.map(sub => ({
                                    value: sub,
                                    label: SUBCATEGORY_LABELS[sub]
                                }))
                            ]}
                        />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-semibold mb-3">📦 Package Info</h4>
                        <div className="grid grid-cols-3 gap-3">
                            <Input
                                type="number"
                                step="0.01"
                                label="Price (€)"
                                value={formData.packagePrice}
                                onChange={(e) => setFormData({ ...formData, packagePrice: e.target.value })}
                                placeholder="8.00"
                                required
                            />
                            <Input
                                type="number"
                                label="Size"
                                value={formData.packageSize}
                                onChange={(e) => setFormData({ ...formData, packageSize: e.target.value })}
                                placeholder="1000"
                                required
                            />
                            <Select
                                label="Unit"
                                value={formData.packageUnit}
                                onChange={(e) => setFormData({ ...formData, packageUnit: e.target.value })}
                                options={[
                                    { value: 'g', label: 'grams' },
                                    { value: 'kg', label: 'kg' },
                                    { value: 'ml', label: 'ml' },
                                    { value: 'l', label: 'liters' },
                                    { value: 'pieces', label: 'pieces' },
                                ]}
                            />
                        </div>
                    </div>

                    <Select
                        label="⏱️ Cooking Difficulty"
                        value={formData.difficulty}
                        onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                        options={[
                            { value: 'NO_COOKING', label: '🥗 No cooking (ready to eat)' },
                            { value: 'VERY_EASY', label: '⚡ Very easy (5 min)' },
                            { value: 'EASY', label: '👍 Easy (10-15 min)' },
                            { value: 'MEDIUM', label: '👨‍🍳 Medium (20+ min)' },
                            { value: 'COMPLEX', label: '🔥 Complex' },
                        ]}
                    />

                    <p className="text-sm text-gray-500 bg-blue-50 p-3 rounded-lg">
                        💡 <strong>AI will handle the rest!</strong> Nutrition info will be calculated automatically.
                    </p>

                    <div className="flex gap-2 mt-4">
                        <Button type="submit" variant="primary" isLoading={createMutation.isPending}>Add Item</Button>
                        <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

// Grocery Card Component
function GroceryCard({
    item,
    onDelete,
    getDifficultyLabel,
    getDifficultyColor
}: {
    item: GroceryItem;
    onDelete: () => void;
    getDifficultyLabel: (diff: string) => string;
    getDifficultyColor: (diff: string) => string;
}) {
    const categoryInfo = CATEGORY_INFO[item.category];
    const subcategoryLabel = item.subcategory ? SUBCATEGORY_LABELS[item.subcategory as GrocerySubcategory] : null;

    return (
        <Card>
            <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${categoryInfo.bgColor} ${categoryInfo.color}`}>
                            {categoryInfo.icon} {categoryInfo.label}
                        </span>
                        {subcategoryLabel && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                                {subcategoryLabel}
                            </span>
                        )}
                    </div>
                </div>
                <button
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-700 text-sm ml-2"
                >
                    ✕
                </button>
            </div>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600">Price:</span>
                    <span className="font-bold text-green-600">€{item.packagePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Package:</span>
                    <span>{item.packageSize} {item.packageUnit}</span>
                </div>
                <div className="pt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(item.difficulty)}`}>
                        {getDifficultyLabel(item.difficulty)}
                    </span>
                </div>
            </div>
        </Card>
    );
}
