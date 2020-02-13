exports.handleErrors = function(err, req, res, next) {
    if(!err) {
      //if no error then skip to the unknown route hanlder 
      return next();
    }

    const status = +err.status || 500;
   
    let message;

    if(err.message.msg) {
      message = `${err.message.msg}: ${err.message.param}`
    } else if(err.message) {
      message = err.message;
    }

    const errorMessage = message || "Oops, something went wrong!";
    return res.status(status).json({
      message: errorMessage
    });
  }