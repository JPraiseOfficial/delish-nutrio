import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
    food_name: { type: String, required: true },
    main_ingredients: { type: [String], required: true },
    description: { type: String, required: true },
    food_health: { type: String, required: true },
    food_class: { type: String, required: true },
    region: { type: String, required: true },
    spice_level: { type: String, required: true },
    price_range: { type: String, required: true },
    nutritional_content: { type: String, required: true },
    calories_contained: { type: String, required: true },
    diet_type: { type: String, required: true },
    best_eaten_as: { type: String, required: true },
    suitable_for: { type: [String], required: true },
    health_benefit: { type: String, required: true },
    not_suitable_for: { type: [String], required: true },
    cooking_instructions: { type: String, required: true },
}, {timestamps: true});

export const Meal = mongoose.model('Meal', mealSchema);
