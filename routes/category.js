const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category')

//Get
router.get("/category", categoryController.getAllCategory);

// create
router.get('/frmCreateCategory', (req, res) => {
    res.render('./category_view/frmCreateCategory')
})
router.post("/create_category", categoryController.createNewCategory);


//delete
router.get("/delete_category/:id", categoryController.deleteCategory);


//Update
router.get('/getCategoryById/:id', categoryController.getCategoryById);
router.post('/update_category/:id', categoryController.updateCategory)

module.exports = router;