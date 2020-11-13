const userService = require("../services/userService");

function checkPermission(access) {
  
  
  return (req, res, next) => {
    let token = req.header("x-auth");
    
    userService
      .findByToken(token)
      .then(async (user) => {
         
        if (await userService.accessReq(token, access)) {
          
            res.status(200).send(true);
        } else {
            res.status(401).send(false);
        }
      })
      .catch(err => { 
        res.status(403).send(false);
      });
  };
}

function isPermit(access) {
  // console.log("IsPermit LOG")
  
  return (req, res, next) => {
    //let token = req.params.token;
    let token = req.header("x-auth");
     
     
    userService
      .findByToken(token)
      .then(async (user) => {
         
        if (await userService.accessReq(token, access)) {
          
          req.user = user;
          req.token = token;
          // console.log("in IF")
          next();
        } else {
          res.status(401).send('user does not have access to ' + access); 
          //Promise.reject('user does not have access to ' + access);
        }
      })
      .catch(err => { 
        
        res.status(403).send(err);
      });
  };
}


module.exports = {
  checkPermission,
  isPermit
};
