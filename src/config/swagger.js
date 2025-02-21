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
        servers: [
            {
                url: "http://localhost:3000",
                description: "Local server",
            },
            {
                url: "https://delish-nutrio.onrender.com/",
                description: "Live server",
            }
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
            }
        }
    },
    apis: ["./src/routes.js"],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);  

export default swaggerDocs;