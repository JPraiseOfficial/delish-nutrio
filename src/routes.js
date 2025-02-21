import express from "express";
import * as userControllers from './controllers/userController.js';
import { validateForm } from "./middleware/formValidation.js";
import * as authController from "./controllers/authController.js";
import auth from "./middleware/auth.js";
import * as mealControllers from "./controllers/mealControllers.js";

const router = express.Router();

/** 
* @swagger
* /api/register:
*   post:
*     summary: Register a new user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/User'
*     responses:
*       201:
*         description: User created
*       400:
*         description: Bad request
*/
router.post('/register', validateForm, userControllers.createNewUser);

/**
 * @swagger
 * /api/verifyemail/{token}:
 *   get:
 *     summary: Verify user email
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
 */
router.post('/login', authController.login);

router.post('/newprofile', auth, userControllers.createNewProfile);
router.get('/profile', auth, userControllers.getUserProfile);
router.put('/updateprofile', auth, userControllers.updateUserProfile);

router.post('/generatemeal', auth, mealControllers.generateMeal);
router.get('/mealplan', auth, mealControllers.getMealPlan);


/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Get user details
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User details
 *       400:
 *         description: User not found
 */
router.get('/user', auth, userControllers.getUser);

/**
 * @swagger
 * /api/updateuser:
 *   put:
 *     summary: Update user details
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
 *       400:
 *         description: Bad request
 */
router.put('/updateuser', auth, userControllers.updateUser);

/**
 * @swagger
 * /api/deleteuser:
 *   delete:
 *     summary: Delete user account
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: User deleted
 *       400:
 *         description: Bad request
 */
router.delete('/deleteuser', auth, userControllers.deleteUser);

/**
 * @swagger
 * /api/logout:
 *   get:
 *     summary: User logout
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 */
router.get('/logout', authController.logout);

/**
 * @swagger
 * /api/forgotpassword:
 *   post:
 *     summary: Forgot password
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
 *    responses:
 *     200:
 *      description: Password reset link has been sent to your mail
 *    404:
 *     description: User not found
 */
router.post('/forgotpassword', authController.forgotPassword);

/**
 * @swagger
 * /api/resetpassword/{token}:
 *   post:
 *     summary: Reset password
 *     parameters:
 *     - in: path
 *       name: token
 *       required: true
 *       description: Token sent to user email
 *       schema:
 *         type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             password:
 *               type: string
 *               description: New password
 *               example: password123456
 *            confirmPassword:
 *               type: string
 *               description: New password
 *               example: password123456
 *   responses:
 *     200:
 *       description: Password reset successful
 *     400:
 *       description: Invalid or expired token
 */
router.post('/resetpassword/:token', authController.resetPassword);

export default router
