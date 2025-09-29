// const { createDefaultPreset } = require("ts-jest");
import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
export default {
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
};


// import { createDefaultPreset } from 'ts-jest';

// /** @type {import('jest').Config} */
// export default {
//   testEnvironment: "node",
//   preset: 'ts-jest/presets/default-esm',
//   extensionsToTreatAsEsm: ['.ts'],
//   moduleNameMapping: {
//     '^(\\.{1,2}/.*)\\.js$': '$1',
//   },
//   transform: {
//     '^.+\\.tsx?$': [
//       'ts-jest',
//       {
//         useESM: true,
//         tsconfig: {
//           module: 'ESNext',
//         },
//       },
//     ],
//   },
// };