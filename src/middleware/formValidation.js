import { body, validationResult } from "express-validator";
import {User} from "../models/UserModels.js";

// Custom validations
const validateIfEmailExists = async (value) => {
    const existingEmail = await User.findOne({ where: { email: value } })

    if (existingEmail) {
        throw new Error("Email already exists!");
    } else {
        return true
    }
}

const validateIfPhoneNumberExists = async (value) => {
    const existingNumber = await User.findOne({ where: { phone_number: value } })

    if (existingNumber) {
        throw new Error("Phone Number already exists!");
    } else {
        return true
    }
}

const confirmPassword = (value, { req }) => {
    if (value !== req.body.password) {
        throw new Error("Password does not match");
    } else {
        return true;
    }
}

export const validateForm = [
    body('firstname')
        .isString().notEmpty().withMessage('Please, input your first name'),
    body('lastname')
        .isString().notEmpty().withMessage('Please, input your last name'),
    body('username')
        .isString().notEmpty().withMessage('Please, input your username'),
    body('phone_number')
        .isNumeric().notEmpty().isLength({ min: 11, max: 11 }).withMessage('Provide a valid phone number')
        .custom(validateIfPhoneNumberExists),
    body('email')
        .isEmail().notEmpty().withMessage('Please, provide a valid email address')
        .custom(validateIfEmailExists),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 5 characters'),
    body('confirmPassword')
        .custom(confirmPassword),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]

export const checkPasswordMatch = [
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 5 characters'),
    body('confirmPassword')
        .custom(confirmPassword),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
]