import jwt from 'jsonwebtoken';

const adminAuth = async(req,res,next)=>{
    try {
        const {token} = req.headers
        if(!token){
            return res.json({success:false,message:"Not Authorised"})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)

        if(typeof token_decode !== "object" || token_decode.role !== "admin"){
            return res.json({success:false,message:'Not Authorized'})
        }
        next();

    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}

export default adminAuth;