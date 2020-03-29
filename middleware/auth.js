// middleware that checks token in the headers
const jwt = require('jsonwebtoken');
const secret = 'dotodavoltdot';


module.exports = function(req,res,next){
        //get the token from the request object
        const token = req.header('x-auth-token');

        //check if there is token
        if(!token){
            res.status(401).json({
                msg:'authorisation failed'
            })
        }
       
        try {
            
             //verify the token using jwt.verify
        const decoded = jwt.verify(token,secret);

        /*get the user object from the decoded object 
        *  and asign it to the user in the req
        */

        req.user = decoded.user;
        next();
        } catch (err) {
            console.log(err.message);
            res.status(401).json({
                msg:'token isnot valid'
            })
        }
}

