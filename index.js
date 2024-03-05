require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: '/public/uploads/' })


// Apply middlewares
app.use(express.static('public'));
app.use(cors());


// Create routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
    const file = req.file;

    if (file) {
        res.json({
            name: file.originalname,
            type: file.mimetype,
            size: file.size
        });
    }
    else {
        res.json({
            error: 'Error processing file'
        });
    }
});


// Start server
const listener = app.listen(process.env.PORT || 3000, () => {
    console.log('App listening on port ' + listener.address().port)
});
