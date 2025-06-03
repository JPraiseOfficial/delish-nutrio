import express from "express";
import * as userControllers from './controllers/userController.js';
import { validateForm, checkPasswordMatch } from "./middleware/formValidation.js";
import * as authController from "./controllers/authController.js";
import auth from "./middleware/auth.js";
import * as mealControllers from "./controllers/mealControllers.js";

const router = express.Router();

/** 
* @swagger
* /api/register:
*   post:
*     summary: Register a new user
*     tags: [User]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: User created. A verification link has been sent to your email. Click it to verify your email.
*       400:
*         description: Bad request
*/
router.post('/register', validateForm, userControllers.createNewUser);

/**
 * @swagger
 * /api/verifyemail/{token}:
 *   get:
 *     summary: Verify user email
 *     tags: [User]
 *     parameters:
 *      - in: path
 *        name: token
 *        required: true
 *        description: Token sent to user email
 *        schema:
 *          type: string
 *     responses:
 *      200: 
 *        description: Email verified
 *      400:
 *       description: Invalid or expired token  
 */
router.get('/verifyemail/:token', userControllers.verifyEmail);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailOrPhone:
 *                 type: string
 *                 description: User email or phone number
 *                 example: johndoe@email.com
 *               password:
 *                 type: string
 *                 description: User password
 *                 example: password123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', authController.login);

/**
 * @swagger
 * /api/newprofile:
 *   post:
 *     summary: Create a new diet profile for diet recommendation
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       201: 
 *         description: Profile created
 *       401:
 *         description: Access denied
 *       400:
 *         description: Bad Request
 */
router.post('/newprofile', auth, userControllers.createNewProfile);

/**
 * @swagger
 * /api/profile:
 *   get:
 *     summary: Gets user's diet profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User Profile
 *       401:
 *         description: Access Denied
 *       400:
 *         description: Bad request
 */
router.get('/profile', auth, userControllers.getUserProfile);

/**
 * @swagger
 * /api/updateprofile:
 *   put:
 *     summary: Updates user's diet profile
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200: 
 *         description: Profile updated
 *       401:
 *         description: Access denied
 *       400:
 *         description: Bad Request
 */
router.put('/updateprofile', auth, userControllers.updateUserProfile);

/**
 * @swagger
 * /api/generatemeal:
 *   post:
 *     summary: Generates user's meal plan
 *     tags: [Meal]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserProfile'
 *     responses:
 *       200:
 *         description: Meal generated and saved
 *       401:
 *         description: Access Denied
 */
router.post('/generatemeal', auth, mealControllers.generateMeal);

/**
 * @swagger
 * /api/mealplan:
 *   get:
 *     summary: Gets user's meal plan
 *     tags: [Meal]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200: 
 *         description: User meal plan
 *       401:
 *         description: Access Denied
 */
router.get('/mealplan', auth, mealControllers.getMealPlan);


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user details
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User details
 *       401:
 *         description: Access Denied
 */
router.get('/user', auth, userControllers.getUser);

/**
 * @swagger
 * /api/updateuser:
 *   put:
 *     summary: Update user details
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User updated
 *       401:
 *         description: Access Denied
 */
router.put('/updateuser', auth, userControllers.updateUser);

/**
 * @swagger
 * /api/deleteuser:
 *   delete:
 *     summary: Delete user account
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *       401:
 *         description: Access Denied
 */
router.delete('/deleteuser', auth, userControllers.deleteUser);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: User logout
 *     tags: [User]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Access Denied
 */
router.get('/logout', authController.logout);

/**
 * @swagger
 * /api/forgotpassword:
 *   post:
 *     summary: Forgot password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: User email
 *                 example: johndoe@email.com
 *     responses:
 *      200:
 *        description: Password reset link has been sent to your mail
 *      404:
 *        description: User not found
 *      500:
 *        description: Email not sent, please, try again later
 */
router.post('/forgotpassword', authController.forgotPassword);

/**
 * @swagger
 * /api/resetpassword/{token}:
 *   post:
 *     summary: Reset password
 *     tags: [User]
 *     parameters:
 *     - in: path
 *       name: token
 *       required: true
 *       description: Token sent to user email
 *       schema:
 *         type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: New password
 *                 example: password123456
 *               confirmPassword:
 *                 type: string
 *                 description: New password
 *                 example: password123456
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Bad request
 */
router.post('/resetpassword/:token', checkPasswordMatch, authController.resetPassword);

export default router
