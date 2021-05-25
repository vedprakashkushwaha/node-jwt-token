const mongoose = require('mongoose');
module.exports = function() {
    mongoose.connect('mongodb://localhost/student-db').then(()=>{
        console.log('database connected successfully')
    }).catch(()=>{
        console.log('Unable to connect database!!');
    });
}