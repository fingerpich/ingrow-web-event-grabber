import { getBabelOutputPlugin } from '@rollup/plugin-babel'
import path from "path"

export default {
  input: './index.js',
  output:  [
    // {file: './dist/bundle.cjs.js', format: 'cjs' },
    // {file: './dist/bundle.esm.js', format: 'esm' },
    {file: './dist/index.js', format: 'esm' }
  ],
  plugins: [
    getBabelOutputPlugin({
      configFile: path.resolve(__dirname, '.babelrc')
    })
  ]
};