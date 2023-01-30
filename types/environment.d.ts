declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      REPOSITORY_OWNER: string;
      REPOSITORY_NAME: string;
      GITHUB_TOKEN: string;
    }
  }
}

export {};
