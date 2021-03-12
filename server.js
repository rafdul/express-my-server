const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');

const upload = multer();
const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname, '/public')));

app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index', { layout: 'main' });
});

app.get('/about', (req, res) => {
    res.render('about', { layout: 'main' });
});

app.get('/contact', (req, res) => {
    res.render('contact', { layout: 'main' });
});

app.get('/info', (req, res) => {
    res.render('info', { layout: 'main' });
});

app.get('/history', (req, res) => {
    res.render('history', { layout: 'dark' });
});

app.get('/hello/:name', (req, res) => {
    res.render('hello', { layout: 'main', name: req.params.name });
});

// app.use(express.json());
app.post('/contact/send-message', upload.single('fileName'), (req, res) => {
    const { author, sender, title, message } = req.body;
    const imageName = req.file;
    console.log('req.body',req.body);
    console.log('req.file',req.file);

    if(author && sender && title && message && imageName) {
        res.render('contact', { isSent: true, fileName: req.file.originalname });
    }
    else {
        res.render('contact', { isError: true });
    }
    // res.json(req.body);
  });

app.use((req, res) => {
    res.status(404).send('404 not found...');
  });

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});