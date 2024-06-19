import jwt from 'jsonwebtoken'



const authenticate = (req,res,next) =>{
    const token = req.headers['token'];

    if(token){
         try{
            const decode = jwt.verify(token, "your_secret_key");
            req.userId = decode.userId
            next()

         }catch(error){
            return res.status(400).json({error:error.message})
         }
    }else{
        return res.status(401).json({message:"Access denied"});
    }
}

export default authenticate;