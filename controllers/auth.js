
const con = require("../config/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = "lmsAntNodeJs"

// Generate token

let generateToken = (id) => {
    return jwt.sign({ id }, secretKey, { expiresIn: 3 * 24 * 60 * 60 })
}


// Login
const getLogin = (req, res) => {
    res.render('./auth/login')
};
const postLogin = (req, res) => {
    const body = req.body;
    console.log(body)

    const sql = "SELECT * FROM user WHERE `email` = ?"

    con.query(sql, [body.email], async (err, data) => {

        if (err) {
            console.log(err);
        }

        if (data.length == 0) {
            console.log("Invalid email!");
            return res.redirect('/login');
        }

        const decryptPassword = await bcrypt.compare(body.password, data[0].password);

        if (decryptPassword) {
            const token = generateToken(data[0].id);

            res.cookie('Token', token, { maxAge: 3 * 24 * 60 * 60, httpOnly: true })
            res.redirect('/');
        } else {
            console.log("invalid password");
            return res.redirect('/login');

        }
    })

};

// Register
const getRegister = (req, res) => {
    res.render('./auth/register')
};
const postRegister = async (req, res) => {
    // console.log(req.body);
    const body = req.body;
    if (body.password != body.confirmPassword) {
        return res.send('Password and confirm password is not matched!');
    }
    const salt = await bcrypt.genSalt();
    const encryptdPassword = await bcrypt.hash(body.password, salt)
    // console.log(`Salt : ${salt}`)
    // console.log(`ec : ${encryptdPassword}`);

    const arrUser = [body.firstname, body.lastname, body.email, encryptdPassword]
    const sql = "INSERT INTO user(`first_name`, `last_name`, `email`, `password`) VALUES (?,?,?,?)"

    con.query("select * from `user` where email = ?", [body.email], (err, result) => {
        if (err) { console.log(err) }
        if (result.length > 0) {
            return res.send("Email already use");
        }
        con.query(sql, arrUser, (err, data) => {
            if (err) {
                console.log(err)
            }
            console.log("Register successfully");
            res.redirect('/login');
        });
    })
};

// forget password
const getForgotPassword = (req, res) => {
    res.render('./auth/forgot_password');
}

const postForgotPassword = (req, res) => {
    const body = req.body;
    console.log(body);
    const sql = "select `id` from `user` where email = ?";
    con.query(sql, [body.email], (err, result) => {
        if (err) {
            console.log(err);
            return res.redirect('/login');
        }

        if (result.length == 0) {
            return res.send('Email not found!');
        }
        res.render('./auth/new_password', { updateId: result[0].id });
    })
}


// new password
const postNewPassword = async (req, res) => {
    const body = req.body;
    console.log(body);

    if (body.password != body.confirmPassword) {
        return res.send("Password and Confirm password is not match")
    }

    const salt = await bcrypt.genSalt();
    const encryptdPassword = await bcrypt.hash(body.password, salt);

    const sql = "UPDATE `user` SET `password` = ? WHERE `id` = ?";
    // console.log(body.id + ": pass: " + encryptdPassword)
    const arrData = [encryptdPassword, body.id]

    con.query(sql, arrData, (err, data) => {
        if (err) {
            console.log(err)
        }
        console.log("Successfully reset password!");
        res.redirect('/login');
    })
}

// logout
const logout = (req, res) => {
    res.cookie('Token', '', { maxAge: 1 });
    res.redirect('/login')
}
module.exports = {
    getLogin,
    postLogin,
    getRegister,
    postRegister,
    logout,
    getForgotPassword,
    postForgotPassword,
    postNewPassword
}