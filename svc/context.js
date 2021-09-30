'use strict';

const path = require('path');
const log4js = require('log4js');
const cfg = require('../cfg');

class Context{
    constructor(){
        this.cfg = cfg;

        log4js.configure({
            appenders: {
                app: { type: 'dateFile', filename: path.join(cfg.log_dir, cfg.log_name), pattern: '.yyyy-MM-dd', daysToKeep: 7 },
                console: { type: 'console' }
            },
            categories: {
                default: { appenders: ['app', 'console'], level: 'debug' }
            }
        });

        this.logger = log4js.getLogger('BASE');

    }

    debug(msg){
        this.logger.debug(msg);
    }


}

module.exports = new Context();