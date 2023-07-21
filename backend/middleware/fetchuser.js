const jwt= require('jsonwebtoken')
const JWT_SECRET ='Pintu@1609';


const fetchuser=(req, res, next)=>{

    // get the user from jet token and add id to req object

    const token=req.header('auth-token');
    if(!token){
       return res.status(401).send({error:"please authenticate using valid token"})
    }
    try {
        
        const data=jwt.verify(token,JWT_SECRET);
        req.user=data.user;
        next();
    } catch (error) {
        res.status(401).send({error:"please authenticate using valid token id"})
    }
}

module.exports=fetchuser;