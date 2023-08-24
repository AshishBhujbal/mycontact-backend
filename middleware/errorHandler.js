const constants = require('../constants');

const errorHandler =(err,req,res,next)=>{

    const statusCode = res.statusCode ? res.statusCode : 500;

    switch(statusCode)
    {
        case 400:
            {
                res.json({
                    title : "Validation Failed.",
                     message : err.message,
                     stackTrace : err.stack
                })
                break;
            }
        case 401:
            {
               res.json({
                  title : "UnAuthorized access.",
                  message : err.message,
                  stackTrace : err.stack
               }) 
               break;
            }
        case 403:
            {
                res.json({
                    title : "Forbbiden.",
                    message : err.message,
                    stackTrace : err.stack
                 }) 
                 break;
            }
        case 404:
            {
                res.json({
                    title : "Not Found.",
                    message : err.message,
                    stackTrace : err.stack
                 }) 
                 break;
            }
            case 500:
            {
                 res.json({
                        title : "Server Error.",
                        message : err.message,
                        stackTrace : err.stack
                 }) 
                 break;
            }
            default:
                res.json({
                    title:"whats wrong!",
                    message:err.message,
                    stackTrace:err.stack
                })
                  //console.log("All Ok.")
    }
 }

module.exports=errorHandler;