const jwt=require("jsonwebtoken")

const authArtist=async(req,res,next)=>{
    const token =req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"})

    }
    try{
        const decoded =jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!="artist"){
            return res.status(403).json({
                message:"You Do not have Access to this resource"
            })
        }
        req.user=decoded;

        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized"})
    }
}
async function authUser(req,res,next){
    const token =req.cookies.token;
    if(!token)
        return res.status(401).json({message:"Unauthorized"})
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(decoded.role!="user")
        {
            return res.status(403).json({message: "you don't have Access"})

        }
        req.user=decoded;
        next();
    }
    catch(err){
        console.log(err);
        return res.status(401).json({message:"Unauthorized"})
    }
}

module.exports={authArtist,authUser}