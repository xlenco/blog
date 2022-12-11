const path = require('path');

module.exports = {
  entry: './public/js/custom.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '123.js',
  },
};
