// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const config = require('../webpack.config');

webpack(config, (err, stats) => {
  if (err) {
    console.error(err.stack || err);
    if (err.details) console.error(err.details);
    process.exitCode = 1;
    return;
  }

  console.log(
    stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
    })
  );

  if (stats.hasErrors()) {
    process.exitCode = 1;
  }
});
