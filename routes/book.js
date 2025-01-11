const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book')

// Get
router.get("/books", bookController.getAllBook);

// create
router.get('/frmCreateBook', (req, res) => {
    res.render('./book_view/frmCreateBook')
})
router.post("/create_book", bookController.createNewBook);


//delete
router.get("/delete_book/:id/:image", bookController.deleteBook);


//Update
router.get('/getBookById/:id', bookController.getBookById);
router.post('/update_book/:id', bookController.updateBook)

module.exports = router;