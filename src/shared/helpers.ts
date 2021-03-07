export interface JwtPayload {
  email: string;
  level: number;
}

export interface DefaultStatus {
  error: boolean;
  message?: string;
}

export interface LoginStatus {
  email: string;
  expiresIn: string | number;
  accessToken: string;
}

export interface EnvConfig {
  SECRET_KEY: string;
  EXPIRES_IN: string;
}

export interface AuthorizeStatus {
  error: boolean;
  token: string;
}
