const con = require('../config/db');
const fs = require('fs');
const vBook = require('../validation/book');

let getAllBook = (req, res) => {
    const sql = `SELECT * FROM book`;
    con.query(sql, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.render("./book_view/tbl_book", { books: data })
    })
}

let createNewBook = (req, res) => {
    const { error, value } = vBook(req.body);

    if (error) {
        res.send(error)
        return;
    }

    let sampleFileName = 'default_08989.jpg';
    if (req.files && Object.keys(req.files).length > 0) {
        let sampleFile = req.files.cover;
        sampleFileName = Date.now() + sampleFile.name;
        let uploadPath = "./public/upload/" + sampleFileName;
        sampleFile.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
            }
            console.log('File uploaded!');
        });
    }
    const sql = "INSERT INTO `book`(`name`, `author_id`, `category_id`, image) VALUES (?,?,?,?)"
    const body = req.body;
    // const arrBook = [body.book_name, body.author_id, body.category_id];
    const arrBook = [body.book_name, 1, 1, sampleFileName];

    con.query(sql, arrBook, (err, data) => {
        if (err) {
            console.log(err);
        }
        res.redirect("/books");
    })
}

let deleteBook = (req, res) => {
    let cover = req.params.image;

    if (cover != 'default_08989.jpg') {
        fs.unlinkSync('./public/upload/' + cover, (err) => {
            console.log(err);
        })
    }
    const sql = "DELETE FROM book where id = ?"
    const id = req.params.id;

    con.query(sql, id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })
};


let getBookById = (req, res) => {
    const sql = `SELECT * FROM book WHERE id = ?`;
    const id = req.params.id;

    con.query(sql, id, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.render('./book_view/frmUpdateBook', { book: data });
    })
}


let updateBook = (req, res) => {
    const { error, value } = vBook(req.body);

    if (error) {
        res.send(error)
        return;
    }
    const body = req.body;
    let fileImg;
    if (!req.files) {
        fileImg = body.old_image
    } else {
        let sampleFileName;
        if (req.files && Object.keys(req.files).length > 0) {
            let sampleFile = req.files.cover;
            sampleFileName = Date.now() + sampleFile.name;
            let uploadPath = "./public/upload/" + sampleFileName;
            sampleFile.mv(uploadPath, function (err) {
                if (err) {
                    console.log(err)
                }
                if (body.old_image != 'default_08989.jpg') {
                    fs.unlinkSync("./public/upload/" + body.old_image);
                }
            });
            fileImg = sampleFileName;
        }
    }


    const sql = "UPDATE `book` SET `name`=?,`author_id`=?,`category_id`=?, image=? WHERE id = ?"
    // const arrBook = [body.book_name, body.author_id, body.category_id, req.params.id];
    const arrBook = [body.book_name, 2, 2, fileImg, req.params.id];

    con.query(sql, arrBook, (err, data) => {
        if (err) {
            console.log(err)
        }
        res.redirect('/books')
    })

}

module.exports = {
    getAllBook,
    createNewBook,
    deleteBook,
    getBookById,
    updateBook
}     