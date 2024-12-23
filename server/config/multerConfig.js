import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve('./public/uploads/'));
    },
    filename: function (req, file, cb) {
        const fileName = `image-${Date.now()}-${file.originalname}`;
        cb(null, fileName)
    }
})


const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/png" || file.mimetype === "image/jpg" || file.mimetype === "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error("Only file types of png, jpg and jpeg are allowed"))
    }
}

export const upload = multer({
    storage: storage,
    fileFilter: fileFilter
})