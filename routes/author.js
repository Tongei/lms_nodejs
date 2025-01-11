const express = require('express');
const router = express.Router();
const authorController = require('../controllers/author');


// get
router.get('/authors', authorController.getAllAuthor);

// create
router.get('/frmCreateAuthor', (req, res) => {
    res.render('./author_view/frmCreateAuthor')
})
router.post('/creat_author', authorController.createNewAuthor);

// update
router.get("/getAuthorById/:id", authorController.getAuthorById);
router.post('/update_author/:id', authorController.updateAuthor);

// delete
router.get('/delete_author/:id', authorController.deleteAuthor);

module.exports = router;