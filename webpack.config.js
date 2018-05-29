const baseConfig = require('@itslearning/protomorph/webpack.config');
const path = require('path');

const outPath = 'dist';

const config = Object.assign({}, baseConfig, {
    entry: {
        'index': ['./assets/index.js', './assets/index.scss']
    },
    output: {
        path: path.join(__dirname, outPath),
        filename: '[name].bundle.js'
    }
});

module.exports = config;
