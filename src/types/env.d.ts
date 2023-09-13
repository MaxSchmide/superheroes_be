declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT: string;
      CLIENT_ORIGINS: string;
    }
  }
}

export {};
