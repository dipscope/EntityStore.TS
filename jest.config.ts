import type {Config} from 'jest';

const config: Config = {
  reporters: ['default'],
  testEnvironment: "node",
  transform: {
    "^.+\.tsx?$": ["ts-jest",{}],
  },
};

export default config;
