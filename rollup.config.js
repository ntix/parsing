import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert { type: "json" };;

export default {
  input: `src/index.ts`,
  output: [
    {
      file: pkg.main,
      format: 'umd',
      name: 'parsing',
      sourcemap: true,
    },
  ],
  watch: {
    include: 'src/**',
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
  ],
};
