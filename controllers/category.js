const con = require('../config/db');
const vCategory = require('../validation/category')

let getAllCategory = (req, res) => {
    const sql = 'SELECT * FROM category';
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.render('./category_view/tbl_category', { category: data })
    })
}

let deleteCategory = (req, res) => {

    const sql = "DELETE FROM category WHERE id = ?"
    const id = req.params.id;

    con.query(sql, id, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/category')
    })
}

let createNewCategory = (req, res) => {
    const { error, value } = vCategory(req.body);

    if (error) {
        res.send(error)
        return;
    }
    const sql = "INSERT INTO `category`(`name`) VALUES (?)"
    const body = req.body;
    const arrCategory = [body.category_name];

    con.query(sql, arrCategory, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/category')
    })
}

let updateCategory = (req, res) => {
    const { error, value } = vCategory(req.body);

    if (error) {
        res.send(error)
        return;
    }
    const sql = "UPDATE `category` SET `name`=? WHERE id = ?";
    const id = req.params.id;
    const body = req.body;
    const arrCategory = [body.category_name, id]

    con.query(sql, arrCategory, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/category');
    })
}

let getCategoryById = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM category WHERE id = ?";
    con.query(sql, id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.render('./category_view/frmUpdateCategory', { category: data })
    })
}

module.exports = {
    getAllCategory,
    getCategoryById,
    createNewCategory,
    updateCategory,
    deleteCategory
}