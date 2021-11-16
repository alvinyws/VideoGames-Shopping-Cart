const express = require('express')
const app = express()

const PORT = 5000

app.use(express.static('public'))      //render the images and css styles, if not only giv u html content without css design


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/store', (req, res) => {
    res.sendFile(__dirname + '/store.html')
})

app.get('/about', (req, res) => {
    res.sendFile(__dirname + '/about.html')
})

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + "/style.css")
});

app.get('/store.js', (req, res) => {
    res.sendFile(__dirname + "/store.js")       //use the frontend javascript store.js
})                                              //also remember to add <script> in store.html



app.listen(PORT, () => {
    console.log(`Server up on port: ${PORT}`)
})