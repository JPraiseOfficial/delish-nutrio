import express from "express";
import * as userControllers from './controllers/userController.js';
import { validateForm } from "./middleware/formValidation.js";
import * as authController from "./controllers/authController.js";
import auth from "./middleware/auth.js";
import * as mealControllers from "./controllers/mealControllers.js";

const router = express.Router();

router.post('/register', validateForm, userControllers.createNewUser);
router.get('/verifyemail/:token', userControllers.verifyEmail);
router.post('/login', authController.login);
router.post('/newprofile', auth, userControllers.createNewProfile);
router.get('/profile', auth, userControllers.getUserProfile);
router.put('/updateprofile', auth, userControllers.updateUserProfile);

router.post('/generatemeal', auth, mealControllers.generateMeal);
router.get('/mealplan', auth, mealControllers.getMealPlan);


router.get('/user', auth, userControllers.getUser);
router.put('/updateuser', auth, userControllers.updateUser);
router.delete('/deleteuser', auth, userControllers.deleteUser);
router.get('/logout', authController.logout);
router.post('/forgotpassword', authController.forgotPassword);
router.post('/resetpassword/:token', authController.resetPassword);

export default router
