import { Router } from "express";
import {
  changeCurrentPassword,
  forgotPasswordRequest,
  getCurrentUser,
  login,
  logoutUser,
  refreshAccessToken,
  registerUser,
  resendEmailVerification,
  resetForgotPassword,
  verifyEmail,
} from "../controllers/auth.controllers.js";
import { validator } from "../middlewares/validator.middleware.js";
import {
  userChangeCurrentPasswordValidator,
  userForgotPasswordValidator,
  userLoginValidator,
  userRegisterValidator,
  userResetForgotPasswordValidator,
} from "../validatiors/index.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// PUBLIC ROUTES
router
  .route("/register")
  .post(userRegisterValidator(), validator, registerUser);

router.route("/login").post(userLoginValidator(), validator, login);

router.route("/verify-email/:verificationToken").get(verifyEmail);

router.route("/refresh-token").get(refreshAccessToken);
router
  .route("/forgot-password")
  .post(userForgotPasswordValidator(), validator, forgotPasswordRequest);

router
  .route("/reset-password/:unhashedToken")
  .post(userResetForgotPasswordValidator(), validator, resetForgotPassword);

// SECURE ROUTES
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/current-user").post(verifyJWT, getCurrentUser);
router
  .route("/change-password")
  .post(
    verifyJWT,
    userChangeCurrentPasswordValidator(),
    validator,
    changeCurrentPassword,
  );

router
  .route("/resend-email-verification")
  .post(verifyJWT, resendEmailVerification);

export default router;
