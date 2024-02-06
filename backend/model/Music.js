const mongoose = require("mongoose");

const {Schema} = mongoose;



const musicSchema = new Schema({
    title:{
        type:String, 
        required:true
    },
    genre :{
        type:String, 
        required:true,
    }, 
    album:{
        type:String, 
        required:true
    }, 
    artist:{
        type:String, 
        required:true
    }
},{
    timestamps:true
})

const Music = mongoose.model('Music', musicSchema);

module.exports = Music;
