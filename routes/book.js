const express = require('express');
const router = express.Router();
const bookController = require('../controllers/book');

const { requireAuth } = require('../middlewares/auth')

// Get
router.get("/books", bookController.getAllBook);

// create
router.get('/frmCreateBook', requireAuth, (req, res) => {
    res.render('./book_view/frmCreateBook')
})
router.post("/create_book", bookController.createNewBook);


//delete
router.get("/delete_book/:id/:image", requireAuth, bookController.deleteBook);


//Update
router.get('/getBookById/:id', requireAuth, bookController.getBookById);
router.post('/update_book/:id', bookController.updateBook)

module.exports = router;