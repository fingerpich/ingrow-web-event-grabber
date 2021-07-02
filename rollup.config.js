import resolve from 'rollup-plugin-node-resolve';
import commonJS from 'rollup-plugin-commonjs'
import { uglify } from "rollup-plugin-uglify";
import babel from 'rollup-plugin-babel';

const babelConfig = {
  "presets": [
    "@babel/preset-env",
  ],
  "plugins": [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/plugin-proposal-optional-chaining"
  ]
}

export default {
  input: './index.js',
  plugins: [
    resolve(),
    commonJS({include: 'node_modules/**'}),
    babel(babelConfig),
    uglify(),
  ],
  output: [
    {file: './dist/bundle.min.js',  name: "IngrowEventGrabber", format: 'iife'},
    {file: './dist/index.js', format: 'cjs' }
  ]
}