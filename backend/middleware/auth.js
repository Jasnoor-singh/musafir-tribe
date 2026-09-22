import jwt from 'jsonwebtoken'

const authUser = async(req,res,next)=>{
    const {token}= req.headers;

    if(!token){
        return res.json({success:false,message:"Not Authorized Please Login Again."})
    }

    try {
        const token_decode =jwt.verify(token,process.env.JWT_SECRET)
        if (typeof token_decode !== 'object' || !token_decode.id) return res.status(401).json({success:false,message:"Please sign in again."});
        req.body.userId = token_decode.id;
        req.user = { id: token_decode.id}; // Store userId in req.user
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


export default authUser