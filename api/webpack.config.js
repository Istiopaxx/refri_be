const TerserPlugin = require('terser-webpack-plugin');

module.exports = (options, webpack) => {
  const lazyImports = [
    '@nestjs/microservices/microservices-module',
    '@nestjs/websockets/socket-module',
    'class-transformer/storage',
  ];

  return {
    ...options,
    externals: [
      {
        kafkajs: 'commonjs kafkajs',
        nats: 'commonjs nats',
        mqtt: 'commonjs mqtt',
        ioredis: 'commonjs ioredis',
        amqplib: 'commonjs amqplib',
        'amqp-connection-manager': 'commonjs amqp-connection-manager',
      },
    ],
    output: {
      ...options.output,
      libraryTarget: 'commonjs2',
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
          },
        }),
      ],
    },
    plugins: [
      ...options.plugins,
      new webpack.IgnorePlugin({
        checkResource(resource) {
          if (lazyImports.includes(resource)) {
            try {
              require.resolve(resource);
            } catch (err) {
              return true;
            }
          }
          return false;
        },
      }),
    ],
  };
};
