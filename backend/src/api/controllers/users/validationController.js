const { check, validationResult } = require('express-validator');

exports.validationController = [
    check('name').isLength({ min: 4 }).withMessage('name must be minimum 4'),
    check('email').isEmail().withMessage('must be a valid email'),
];

exports.userErrorController = (req, res, next) => {
    if (!req.file) {
        return res.status(422).json({
            errors: [
                {
                    msg: 'image must be provided',
                    param: 'images',
                    location: 'images',
                },
            ],
        });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    return next();
};
