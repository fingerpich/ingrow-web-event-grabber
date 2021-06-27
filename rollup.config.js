import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'
import { uglify } from "rollup-plugin-uglify";

export default {
  input: './index.js',
  output:  [
    {file: './dist/bundle.min.js', name: "IngrowEventGrabber", format: 'iife' },
    {file: './dist/index.js', format: 'cjs' }
  ],
  plugins: [
    resolve(),
    commonJS({
      include: 'node_modules/**'
    }),
    uglify()
  ],
};