import ratelimit from "../config/upstash.js";

const rateLimiter = async (req,res,next) =>{
    try{
        const {success} = await ratelimit.limit(req.ip);
        if(!success){
            return res.status(429).json({message:"Too many requests, please try again later"});
        }
        next();
    }catch(error){
        console.log("Error in rate limiter middleware:", error);
        res.status(500).json({message:"Error in rate limiter middleware"});
        next(error);
    }
}

export default rateLimiter;