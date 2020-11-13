const multer = require('multer');
var path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images/uploads')
    },
    filename: (req, file, cb) => {
       
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
    }
});

const upload = multer({storage: storage});  
 
module.exports ={
    upload 
};