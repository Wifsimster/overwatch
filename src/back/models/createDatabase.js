var sequelize = require('../db/database');

sequelize.sync({
    force: true
}).then(function () {
    console.log('Create models into DB');
}, function (err) {
    console.error(err);
});