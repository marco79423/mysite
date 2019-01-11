require('@babel/register')({
    ignore: [
      /(node_modules)/,
    ],
    presets: [
      '@babel/preset-env',
    ]
});

require('./index')
