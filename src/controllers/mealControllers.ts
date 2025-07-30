import { Request, Response } from "express";
import * as mealServices from "../services/mealServices.js";
import { GenerateMealType } from "../types/userServices.types.js";

export const generateMeal = async (req: Request, res: Response) => {
  const userId = req.user;
  const {
    gender,
    age,
    country,
    region,
    dietary_preferences,
    health_goals,
    activity_levels,
    allergies,
    medical_condition,
    height,
    weight,
  } = req.body;

  try {
    const meals = await mealServices.generateMeal({
      dietary_preferences,
      health_goals,
      medical_condition,
      region,
    });
    const saveMeal = await mealServices.saveMealPlan(userId!, meals);
    res.status(200).json({ message: "Meal generated and saved", meals });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};

export const getMealPlan = async (req: Request, res: Response) => {
  try {
    const mealPlan = await mealServices.getMealPlan(req.user!);
    res.status(200).json(mealPlan);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    }
  }
};
