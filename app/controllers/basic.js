'use strict';

function BasicHandler(){
    this.index = function(req, res) {
        res.render('index');
    };
}

module.exports = new BasicHandler();