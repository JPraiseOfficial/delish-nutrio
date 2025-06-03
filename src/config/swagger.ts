import { cookie } from "express-validator";
import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Delish Nutrio API Documentation",
            version: "1.0.0",
            description: "This is the API documentation for Delish Nutrio",
        },
        tags: [
            {
                name: "User",
                description: "APIs for User management operations (registration, profile, etc.)"
            },
            {
                name: "Meal",
                description: "API for meal plan generation and retrieval"
            }

        ],
        servers: [
            {
                url: "https://delish-nutrio.onrender.com/",
                description: "Live server",
            },
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
        ],
        components: {
            securitySchemes: {
                cookieAuth: {
                    type: "apiKey",
                    in: "cookie",
                    name: "jwtToken",
                }
            },
            schemas: {
                User: {
                    type: "object",
                    required: ["firstname", "lastname", "phone_number", "email", "password", "confirmPassword"],
                    properties: {
                        firstname: {type: "string", example: "John"},
                        lastname: {type: "string", example: "Doe"},
                        username: {type: "string", example: "johndoe"},
                        phone_number: {type: "string", example: "08012345678"},
                        email: {type: "string", example: "johndoe@email.com"},
                        password: {type: "string", example: "password123"},
                        confirmPassword: {type: "string", example: "password123"},
                    }
                },
                UserProfile: {
                    type: "object",
                    required: ["gender", "age", "country", "region", "dietary_preferences", "health_goals", "activity_levels", "allergies", "medical_condition", "height", "weight"],
                    properties: {
                        gender: {
                            type: "string",
                            enum: ["male", "Female"],
                        },
                        age: {
                            type: "string", 
                            example: "25"
                        },
                        country: {
                            type: "string",
                            example: "Nigeria",
                        },
                        region: {
                            type: "string",
                            enum: ["South-South", "South-West", "South-East", "Nationwide"],
                            example: "Lagos",
                        },
                        dietary_preferences: {
                            type: "string",
                            example: "Vegetarian",
                        },
                        health_goals: {
                            type: "string",
                            enum: ["weight gain", "weight loss"]
                        },
                        activity_levels: {
                            type: "string",
                            enum: ["High", "Medium", "Low"]
                        },
                        allergies: {
                            type: "srting",
                            example: "meat"
                        },
                        medical_condition: {
                            type: "string",
                            example: "Diabetes"
                        },
                        height: {
                            type: "string",
                            example: "10"
                        },
                        weight: {
                            type: "string",
                            example: "30"
                        }
                    }
                },
                UserMealPlan: {
                    type: "object",
                    properties: {
                        breakfast: {type: "array"},
                        lunch: {type: "array"},
                        dinner: {type: "array"},
                        snacks: {type: "array"},
                        other: {type: "array"},
                    }
                }
            }
        }
    },
    apis: ["./src/routes.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);  

export default swaggerDocs;