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

export const UserPopulation = {
  path: "mainFolder",
  select: {
    __v: 0,
    owner: 0,
  },
  populate: [
    {
      path: "folders",
      select: {
        __v: 0,
        owner: 0,
      },
    },
    {
      path: "files",
      select: {
        __v: 0,
        owner: 0,
      },
    },
    {
      path: "write",
      select: {
        __v: 0,
        owner: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
        token: 0,
        mainFolder: 0,
      },
    },
    {
      path: "read",
      select: {
        __v: 0,
        owner: 0,
        password: 0,
        createdAt: 0,
        updatedAt: 0,
        token: 0,
        mainFolder: 0,
      },
    },
  ],
};
