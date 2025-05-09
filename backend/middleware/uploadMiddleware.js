const multer =require('multer');
const fs = require("fs");

// Set up storage engine for multer
const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/');
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}-${file.originalname}`);
    },
});
//file filter to only allow images
const fileFilter = (req,file,cb)=>{
    const allowedTypes=['image/jpeg','image/png','image/jpg'];
    if(allowedTypes.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb(new Error('Invalid file type, only JPEG and PNG are allowed'),false);
    }
};

const upload=multer({storage,fileFilter});

module.exports=upload;