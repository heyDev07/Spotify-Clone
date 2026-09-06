const MusicModel=require("../models/music.model")
const {uploadFiles}=require("../services/storage.services")
const jwt=require("jsonwebtoken")

async function createMusic(req,res){

    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({message:"Unauthorized"})
    }

    try
    {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        if(decoded.role!="artist"){
            return res.status(403).json({
                message:"You Do not have Access to create an Music"
            })
        }



    

    const {title}=req.body;
    const file=req.file;


     const result=await uploadFiles(file.buffer.toString("base64"));

     const music=await MusicModel.create({
        uri:result.url,
        title,
        artist:decoded.id
     })

     return res.status(201).json({message:"Music created successfully",music:
        {
            id:music._id,
            title:music.title,
            uri:music.uri,
            artist:music.artist,
        }
     })
}
catch(err){
    console.log(err);
    return res.status(401).json({message:"Unauthorized"})
}
}

module.exports={
    createMusic
}
    



