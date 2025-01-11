const express = require('express');
const app = express();
const fileUplaod = require('express-fileupload')
const bookRouter = require('./routes/book')
const authorRouter = require('./routes/author')
const categoryRouter = require('./routes/category')
const authRouter = require('./routes/auth');

app.use(fileUplaod())
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(bookRouter);
app.use(authorRouter);
app.use(categoryRouter);
app.use(authRouter);
app.get('/', (req, res) => {
    res.render('index')
});


// app.use((req, res) => {
//     res.status(404).render('404');
// })

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});