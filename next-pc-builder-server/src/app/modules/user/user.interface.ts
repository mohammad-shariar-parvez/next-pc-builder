import { Model } from 'mongoose';

export type UserName = {
  firstName: string;
  lastName: string;
};

export type IUser = {
  id?: string;
  email: string;
  name: UserName;
  password: string;
};

export type UserModel = {
  isUserExist(email: string): Promise<Pick<IUser, 'id' | 'email' | 'password'>>;
  isRefreshedUserExist(
    id: string
  ): Promise<Pick<IUser, 'id' | 'email' | 'password'>>;

  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
