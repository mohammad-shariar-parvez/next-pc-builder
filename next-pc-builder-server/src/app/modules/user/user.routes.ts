import { ENUM_USER_ROLE } from '../../../enums/user';

import express from 'express';
import { UserController } from './user.controllers';
import { UserValidation } from './user.validation';
import { requestValidation } from '../../middleware/validationRequest';
import auth from '../../middleware/auth';
const router = express.Router();

router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.createMyProfile
);

router.patch(
  '/my-profile',
  requestValidation.validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.updateMyProfile
);

router.post(
  '/user-create',
  requestValidation.validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);
router.patch(
  '/:id',
  requestValidation.validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

export const UserRoutes = router;
