import typescript from '@rollup/plugin-typescript';

export default {
  input: `src/index.ts`,
  output: [
    {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'parsing',
      sourcemap: true
    }
  ],
  watch: {
    include: 'src/**'
  },
  plugins: [
    typescript({
      tsconfig: 'tsconfig.build.json'
    })
  ],
};
