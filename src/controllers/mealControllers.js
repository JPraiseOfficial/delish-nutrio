import * as mealServices from '../services/mealServices.js';

export const generateMeal = async (req, res) => {
    const { gender, age, country, region, dietary_preferences, health_goals, activity_levels, allergies, medical_condition, height, weight } = req.query;

    try {
        const meals = await mealServices.generateMeal(dietary_preferences, health_goals, medical_condition, region);
        const saveMeal = await mealServices.saveMealPlan(req.user, meals);
        res.status(200).json({ message: "Meal generated and saved", meals });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}