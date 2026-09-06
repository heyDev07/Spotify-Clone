const mongoose=require('mongoose');

const musicSchema=new mongoose.Schema({
    uri:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',//as artist is a user so reference to user collection
        required:true,
    }

});

const MusicModel=mongoose.model('Music',musicSchema);

module.exports=MusicModel;
