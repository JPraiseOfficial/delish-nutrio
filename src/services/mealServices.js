import { Meal } from "../models/mealModel.js"
import { UserMealPlan } from "../models/UserModels.js"

// calculate Basal Metabolic rate (BMR)
export const basalMetabolicRate = (age, gender, weight, height) => {
    if (gender == 'male') {
        return (10 * weight) + (6.25 * height) - (5 * age) + 5
    } else {
        return (10 * weight) + (6.25 * height) - (5 * age) - 161
    }
}

export const totalDailyEnergyExpenditure = (basalMetabolicRate, activityLevel) => {
    switch (activityLevel) {
        case 'Inactive':
            return basalMetabolicRate * 1.2
        case 'lightly active':
            return basalMetabolicRate * 1.375
        case 'moderately active':
            return basalMetabolicRate * 1.55
        case 'very active':
            return basalMetabolicRate * 1.725
        case 'super active':
            return basalMetabolicRate * 1.9
    }
}

export const generateMeal = async (dietary_preferences, health_goals, medical_condition, region) => {
    if (dietary_preferences == 'none') {
        dietary_preferences = '';
    }
    const meals = await Meal.find({
        diet_type: { $regex: dietary_preferences, $options: 'i' },
        health_benefit: { $regex: health_goals, $options: 'i' }
    });
    const filteredMeals = meals.filter(meal => !meal.not_suitable_for.includes(medical_condition));

    const breakfastMeals = [];
    const lunchMeals = [];
    const dinnerMeals = [];
    const snacks = [];
    const otherMeals = [];

    filteredMeals.forEach(meal => {
        const bestEatenAs = meal.best_eaten_as.toLowerCase();

        switch (true) {
            case bestEatenAs.includes('breakfast'):
                breakfastMeals.push(meal.food_name);
                break;
            case bestEatenAs.includes('lunch'):
                lunchMeals.push(meal.food_name);
                break;
            case bestEatenAs.includes('dinner'):
                dinnerMeals.push(meal.food_name);
                break;
            case bestEatenAs.includes('snacks'):
                snacks.push(meal.food_name);
                break;
            default:
                otherMeals.push(meal.food_name);
        }
    });

    const mealPlan = {
        breakfast: breakfastMeals,
        lunch: lunchMeals,
        dinner: dinnerMeals,
        snacks: snacks,
        other: otherMeals
    }

    return mealPlan;
}

export const saveMealPlan = async (UserId, mealPlan) => {
    const saveMeal = await UserMealPlan.create({ ...mealPlan, UserId });
}

export const getMealPlan = async (UserId) => {
    const mealPlan = await UserMealPlan.findOne({ where: { UserId } });
    return mealPlan;
}