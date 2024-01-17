const mongoose = require('mongoose');

const userRolesSchema = new mongoose.Schema({
  roleid:{
    type: Number,
    unique: true,
    required: true
},
  rolename:{
    type:String,
    required: true
  },
  email:{
    type:String,
    unique:true,
    required: true
  }
});

const Roles = mongoose.model('Roles', userRolesSchema);
const insertUserRole = async (roleid, rolename, email) => {
    try {
      const newUserRole = new Roles({ roleid, rolename, email });
      await newUserRole.save();
      console.log('User role inserted successfully');
    } catch (error) {
      if (error.code === 11000) {
        throw new Error('Role ID must be unique');
      } else {
        throw error; // Re-throw other errors for further handling
      }
    }
  };
  
  module.exports.insertUserRole = insertUserRole;
  
module.exports = Roles;

