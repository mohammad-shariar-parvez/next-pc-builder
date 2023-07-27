export type ILogin = {
  email: string;
  password: string;
};

export type ILoginResponse = {
  accessToken: string;
  refreshToken?: string;
  user?: object;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
