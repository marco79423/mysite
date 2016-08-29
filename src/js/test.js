/**
 * Created by Marco on 2016/8/29 .
 */
const context = require.context('.', true, /.+-spec\.js$/)

context.keys().forEach(context);

module.exports = context;