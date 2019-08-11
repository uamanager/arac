import camelCase from 'lodash.camelcase';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';

const pkg = require('./package.json');

const libraryName = 'arac';

export default {
  input: `src/index.ts`,
  output: [
    {file: pkg.main, name: camelCase(libraryName), format: 'cjs', sourcemap: true},
    {file: pkg.browser, name: camelCase(libraryName), format: 'umd', sourcemap: true},
    {file: pkg.module, name: camelCase(libraryName), format: 'es', sourcemap: true}
  ],
  external: [],
  watch: {
    include: 'src/**'
  },
  plugins: [
    json(),
    typescript({useTsconfigDeclarationDir: true}),
    commonjs(),
    resolve(),
    sourceMaps()
  ]
};
