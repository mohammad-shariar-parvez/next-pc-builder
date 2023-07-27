import express from 'express';
import { requestValidation } from '../../middleware/validationRequest';
import { AdminValidation } from './admin.validation';
import { AdminController } from './admin.contoller';

const router = express.Router();

router.post(
  '/create-admin',
  requestValidation.validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);
router.post(
  '/login',
  requestValidation.validateRequest(AdminValidation.loginZodSchema),
  AdminController.loginAdmin
);

router.post(
  '/refresh-token',
  requestValidation.validateRequest(AdminValidation.refreshTokenZodSchema),
  AdminController.refreshToken
);

export const AdminRoutes = router;
