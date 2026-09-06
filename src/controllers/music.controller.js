const MusicModel=require("../models/music.model")
const {uploadFiles}=require("../services/storage.services")
const jwt=require("jsonwebtoken")
const AlbumModel=require("../models/album.model");
const albumModel = require("../models/album.model");


async function createMusic(req,res){
    const {title}=req.body;
    const file=req.file;


     const result=await uploadFiles(file.buffer.toString("base64"));

     const music=await MusicModel.create({
        uri:result.url,
        title,
        artist:req.user.id
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

async function createAlbum(req,res){

         const {title,musics}=req.body;

         const album=await AlbumModel.create({
            title,
            musics:musics,
            artist:req.user.id
         })

         return res.status(201).json({message:"Album created successfully",album:
            {
                id:album._id,
                title:album.title,
                musics:album.musics,
                artist:album.artist,
            }
         })
}

async function getAllMusics(req,res){
    const musics=await MusicModel.find()
    .limit(2).populate("artist","username email")
    return res.status(200).json({
        message:"Musics fetched successfully",
        musics:musics 
    })
}

async function getAllAlbums(req,res){
    const albums=await albumModel.find().select("title artist").populate("artist","username email")
    return res.status(200).json({
        message:"Album Fetched Successfully",
        albums:albums
    })
}

async function getAlbumbyId(req,res){
    const albumId=req.params.albumId;
    const album= await albumModel.findById(albumId).populate("artist","username email").populate("musics")

    return res.status(200).json({
        message:"Album fetched Successfully",
        album : album
    })
}

module.exports={
    createMusic,createAlbum,getAllMusics,getAllAlbums,getAlbumbyId
}
    



