export interface UserAttributes {
  id: number;
  firstname: string;
  lastname: string;
  username?: string | null;
  phone_number: string;
  email: string;
  password: string;
  verifyEmailToken?: string | null;
  verifyEmailTokenExpires?: Date | null;
}

export type CreateNewUser = Omit<UserAttributes, "id">;
export type UpdateUser = { userId: number } & Partial<UserAttributes>;
export interface retunedUser {
  id: number;
  firstname: string;
  lastname: string;
  username?: string | null;
  phone_number: string;
  email: string;
}

export interface UserProfileAttributes {
  gender: string;
  age: string;
  country: string;
  region: string;
  dietary_preferences: string;
  health_goals: string;
  activity_levels: string;
  allergies: string;
  medical_condition: string;
  height: string;
  weight: string;
  UserId: number;
}

export interface GenerateMealType {
  dietary_preferences: string;
  health_goals: string;
  medical_condition: string;
  region: string;
}

export interface BasalMetabolicRateType {
  age: number;
  gender: string;
  weight: number;
  height: number;
}

export interface totalDailyEnergyExpenditureType {
  basalMetabolicRate: number;
  activityLevel: string;
}

export interface MealPlanType {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  snacks: string[];
  other: string[];
}
