const express = require('express');
const multer = require('multer');

const router = express.Router();
const userController = require('../controllers/users/userController');
const validator = require('../controllers/users/validationController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/avatars/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.jpg`);
    },
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    } else {
        cb(new Error('Image uploaded is not of type jpg/jpeg/png', false));
    }
};

const upload = multer({ storage, fileFilter });

router.get('/', userController.getAllUsers);

router
    .route('/:id')
    .get(userController.getUserById)
    .post(
        upload.single('images'),
        validator.validationController,
        validator.userErrorController,
        userController.uploadByUserId
    );

module.exports = router;
