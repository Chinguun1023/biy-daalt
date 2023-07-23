const mongoose=require('mongoose')

const UserSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email: {
        type: String,
        required: [true, "email оруулна уу"],
        match: [
          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
          "э-майл буруу байна",
        ],
        unique: true,
      },
    password:{
        type:String,
        required:true
    },
    profilePic:{
        type:String,
        default:""
    },
}, {timestamps:true})

module.exports = mongoose.model("User",UserSchema)