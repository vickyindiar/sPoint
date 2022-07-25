import path from 'path'
import express from 'express'
import multer from 'multer'
import { authValidation } from '../middleware/authMiddleware.js';
import fs from 'fs';
const router = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    const __dirname = path.resolve()
    cb(null, path.join(__dirname,  'backend/uploads/'))
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    )
  },
})

function removeFile(file){
  const __dirname = path.resolve();
  const __p =  path.join(__dirname,  'backend/uploads')
  file.forEach(element => {
    let img =  path.join(__p,  element)
    if(fs.existsSync(img)){
      fs.unlink(img, err => {
        if (err) throw err;
      })
    }
  });
}

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

router.post('/', authValidation, upload.single('image'), (req, res) => {
  try {
    res.send(`/${req.file.filename}`)
  } catch (error) {
      console.log('error upload', error)
  }

})


const getImage = async(req, res) => {
  let file = req.param.file;
  
  res.json(p);
}

router.get('/:file', authValidation, (req, res) => {
//todo
  const __dirname = path.resolve();
  const __p =  path.join(__dirname,  'backend/uploads');
  const __file = path.join(__p, req.params.file);

  res.sendFile(__file);
});

export {router, removeFile}
