const con = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "lmsAntNodeJs"


const requireAuth = (req, res, next) => {
    const token = req.cookies.Token;
    console.log("Middleware: " + token);
    if (token) {
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                // console.log(err);
                res.redirect('/login')
            }
            if (decodedToken) {
                next();
            }

        })
    } else {
        console.log("You need to login");
        res.redirect('/login')
    }
}

const checkUser = (req, res, next) => {
    const token = req.cookies.Token;
    if (token) {
        jwt.verify(token, secretKey, (err, decodedToken) => {
            if (err) {
                res.locals.user = null;
                return res.redirect('/login');
            }
            else {
                const sql = "SELECT * FROM user WHERE id = ?"
                con.query(sql, decodedToken.id, (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    res.locals.user = data;
                    next();
                })
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}



module.exports = {
    requireAuth,
    checkUser
}