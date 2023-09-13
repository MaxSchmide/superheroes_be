declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGODB_URI: string;
      PORT: string;
      CLIENT_ORIGINS: string;
      S3_ACCESS_KEY: string;
      S3_SECRET_ACCESS_KEY: string;
      S3_BUCKET_NAME: string;
    }
  }
}

export {};
