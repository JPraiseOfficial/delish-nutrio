import mysqldb from "../config/mysqldb.js";
import { DataTypes } from "sequelize";

export const User = mysqldb.define(
    'User',
    {
        firstname: {type: DataTypes.STRING, allowNull: false},
        lastname: {type: DataTypes.STRING, allowNull: false},
        username: {type: DataTypes.STRING, allowNull: true},
        phone_number: {type: DataTypes.STRING, allowNull: false, unique: true},
        email: {type: DataTypes.STRING, allowNull: false, unique: true},
        password: {type: DataTypes.STRING, allowNull: false},
        verifyEmailToken: {type: DataTypes.STRING, allowNull: true},
        verifyEmailTokenExpires: {type: DataTypes.DATE, allowNull: true},
        isVerified: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    },
    {timestamps: true}
)

export const UserProfile = mysqldb.define(
    'User_Profile',
    {
        gender: {type: DataTypes.STRING, allowNull: false},
        age: {type: DataTypes.STRING, allowNull: false},
        country: {type: DataTypes.STRING, allowNull: false},
        region: {type: DataTypes.STRING, allowNull: false},
        dietary_preferences: {type: DataTypes.STRING, allowNull: false},
        health_goals: {type: DataTypes.STRING, allowNull: false},
        activity_levels: {type: DataTypes.STRING, allowNull: false},
        allergies: {type: DataTypes.STRING, allowNull: false},
        medical_condition: {type: DataTypes.STRING, allowNull: false},
        height: {type: DataTypes.STRING, allowNull: false},
        weight: {type: DataTypes.STRING, allowNull: false},
    },
    {timestamps: true}
)

User.hasOne(UserProfile);
UserProfile.belongsTo(User);

export const UserMealPlan = mysqldb.define('User_Meal_Plan', {
    breakfast: {type: DataTypes.JSON, allowNull: true},
    lunch: {type: DataTypes.JSON, allowNull: true},
    dinner: {type: DataTypes.JSON, allowNull: true},
    snacks: {type: DataTypes.JSON, allowNull: true},
    other: {type: DataTypes.JSON, allowNull: true},
}, {timestamps: true});

User.hasOne(UserMealPlan);
UserMealPlan.belongsTo(User);