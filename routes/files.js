var router = require('express').Router();
var multer = require('multer');
// get the file parser

router.use(multer({ dest: './uploads/' }));

router.post('/upload',   function (req, res){
    console.log('Body: ', req.body);
    console.log('files: ', req.files);
    res.status(200).json({ message: 'IMPL_101' });
});

module.exports = router;