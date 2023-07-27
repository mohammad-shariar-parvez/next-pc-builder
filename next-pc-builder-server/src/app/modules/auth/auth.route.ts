import express from 'express';
import { requestValidation } from '../../middleware/validationRequest';
import { AuthValidation } from './auth.validation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
  '/login',
  requestValidation.validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post(
  '/signup',
  requestValidation.validateRequest(AuthValidation.sighnupZodSchema),
  AuthController.signupUser
);

router.post(
  '/refresh-token',
  requestValidation.validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
