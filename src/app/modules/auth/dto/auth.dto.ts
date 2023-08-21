export interface AuthDto {
  userId: string;
  accessToken: string;
  email: string;
  refreshToken: {
    refreshToken: string;
    expiresIn: number;
  };
}
