const dotenv = require('dotenv');
dotenv.config();

const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  // Outras configurações
});
