

if (typeof define !== 'function') {
    global.define = require('requirejs')(module);
}


require('../Common/utils/extender');


require('./staticHosting');
require('./game');




