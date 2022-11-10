import type { Config } from 'jest';

export default async (): Promise<Config> => {
  return {
    setupFilesAfterEnv: ['<rootDir>/dist/scripts/setupJestDbConnect.js'],
  };
};
