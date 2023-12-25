const mongoose = require("mongoose")

const UserSch = new mongoose.Schema({
    identificationid :{
        type : String
    },
    firstname :{
        type : String
    },
    lastname :{
        type : String
    },
    dob:{
        type : Date
    },
    dateofissue:{
        type : Date
    },
    dateofexpiry:{
        type : Date
    }

})

const User = mongoose.model("User",UserSch)
module.exports = User;