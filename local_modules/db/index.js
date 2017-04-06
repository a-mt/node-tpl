var Sequelize = require('sequelize'),
    sequelize = new Sequelize(process.env.MYSQL_URI);

sequelize.ORM = Sequelize;

sequelize.formatErr = function(err) {
   var errors = {};
   for(var i=0; i<err.errors.length; i++) {
       var e = err.errors[i];
       if(e.type == 'unique violation') {
           e.message = 'Already exists';
       }
       errors[e.path] = e;
   }
   return errors;
}

module.exports = exports = sequelize;