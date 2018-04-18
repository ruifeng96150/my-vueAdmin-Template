'use strict'
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv,{
  NODE_ENV:'"development"',
  BASE_API_:'"https://easy-mock.com/mock/5950a2419adc231f356a6636/vue-admin"',
  BASE_API_2:'"http://172.16.32.145/xd_api_test/"',
  BASE_API:'"http://172.16.32.142:8086/api/"'
})
