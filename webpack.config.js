const path = require('path');

module.exports = {
  entry: './public/**/*.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '666.js',
  },
};
