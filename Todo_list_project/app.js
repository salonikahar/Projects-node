const express = require('express')
const app = express();
const port = 8010;
const path = require('path')
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded())

var data = []

app.get('/', function (req, res) {
    return res.render('index',
        { "record": data }
    );
})

app.post('/add', function (req, res) {
    console.log(req.body)
    let obj = {
        name : req.body.name,
        age : req.body.age
    }
    data.push(obj)
    return res.redirect('/');
})

app.get('/deleteData/:pid', (req,res)=>{
    // console.log(req.params.pid)
    data.splice(req.params.pid,1)
    return res.redirect('/');
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log("your server is running on ", port)
})
