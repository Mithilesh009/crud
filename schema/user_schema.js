import mongoose from "mongoose";

import autoIncrement from "mongoose-auto-increment"

mongoose.set('strictQuery', true)

const userschema = mongoose.Schema({
    id: String,
    productName: String,
    seller : String,
    price : String
})

autoIncrement.initialize(mongoose.connection);
userschema.plugin(autoIncrement.plugin,"user")

const user = mongoose.model("user",userschema )

export default user;