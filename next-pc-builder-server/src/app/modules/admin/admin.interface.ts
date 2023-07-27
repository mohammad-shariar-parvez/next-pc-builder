import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IAdmin = {
  id?: string;
  phoneNumber: string;
  role: 'admin';
  password: string;
  name: UserName;
  address: string;
};

export type AdminModel = {
  isAdminExist(
    id: string
  ): Promise<Pick<IAdmin, 'id' | 'phoneNumber' | 'password' | 'role'>>;
  isRefreshedAdminExist(
    id: string
  ): Promise<Pick<IAdmin, 'id' | 'phoneNumber' | 'password' | 'role'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
