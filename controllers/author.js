
const con = require('../config/db');
const vAuthor = require('../validation/author')

let getAllAuthor = (req, res) => {
    const sql = 'SELECT * FROM author';
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.render('./author_view/tbl_author', { authors: data })
    })
}

let deleteAuthor = (req, res) => {

    const sql = "DELETE FROM author WHERE id = ?"
    const id = req.params.id;

    con.query(sql, id, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/authors')
    })
}

let createNewAuthor = (req, res) => {
    const { error, value } = vAuthor(req.body);

    if (error) {
        res.send(error)
        return;
    }

    const sql = "INSERT INTO `author`(`name`) VALUES (?)"
    const body = req.body;
    const arrAuthor = [body.author_name];

    con.query(sql, arrAuthor, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/authors')
    })
}

let updateAuthor = (req, res) => {
    const { error, value } = vAuthor(req.body);

    if (error) {
        res.send(error)
        return;
    }
    const sql = "UPDATE `author` SET `name`=? WHERE id = ?";
    const id = req.params.id;
    const arrAuthor = [req.body.author_name, id]

    con.query(sql, arrAuthor, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/authors');
    })
}

let getAuthorById = (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM author WHERE id = ?";
    con.query(sql, id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.render('./author_view/frmUpdateAuthor', { author: data })
    })
}



module.exports = {
    createNewAuthor,
    getAllAuthor,
    deleteAuthor,
    getAuthorById,
    updateAuthor

}