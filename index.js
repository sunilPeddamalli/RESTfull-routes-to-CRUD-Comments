const express = require('express');
const app = express();
const path = require('path');
var methodOverride = require('method-override')
const { v4: uuid } = require('uuid');
uuid();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method'))


let comments = [
    {
        id: uuid(),
        username: 'Toto',
        comment: 'I am a soccer player'
    },
    {
        id: uuid(),
        username: 'maddy',
        comment: 'I am a basketball player'
    }
]

app.get('/comments', (req, res) => {
    res.render('index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('new')
});

app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuid() });
    res.redirect("/comments")
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render('show', { comment });
});

app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    res.render('edit', { comment });
});

app.patch('/comments/:id', (req, res) => {
    const updatedComment = req.body.comment;
    const { id } = req.params;
    const comment = comments.find((c) => c.id === id);
    comment.comment = updatedComment;
    res.redirect("/comments");
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    comments = comments.filter((c) => c.id !== id);
    res.redirect("/comments");
});

app.listen(3000, () => {
    console.log('Using Port 3000');
});