let express = require('express')
let app = express()
let port = 8005;

let path = require('path')
let db= require('./config/db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'))
app.set('/', express.static(path.join(__dirname, '/assets')))
// app.use('/assets' , path.join(express.static(_dirname, '/assets')));

app.use(express.urlencoded())

let data = {
    budget: 0,
    expenses: [],
    budgetLeft: 0
};

app.get('/', (req, res) => {
    let totalExpense = data.expenses.reduce((sum, exp) => {
        return sum + parseFloat(exp.expenseAmout);
    }, 0);

    let budgetLeft = data.budget - totalExpense;
    res.render('index',
        {
            budget: data.budget,
            totalExpense,
            budgetLeft,
            record : data.expenses
        }
    );
})

app.post('/addBudget', (req, res) => {
    // console.log(req.body)

    data.budget = req.body.budget;
    return res.redirect('/');
})

app.post('/addExpense', (req, res) => {
    // console.log(req.body)

    let obj = {
        expenseAmout: req.body.expenseAmout,
        expenseName: req.body.expenseName,
    }
    data.expenses.push(obj);
    // console.log(data.expenses);

    return res.redirect('/');
})

app.get('/deleteEx/:pid', (req,res)=>{
    data.expenses.splice(req.params.pid,1)
    return res.redirect('/');
})

app.get('/reset', (req, res) => {
    data.budget = 0,
        data.expenses = [],
        data.budgetLeft = 0

        res.redirect('/')
})

app.listen(port, (err) => {
    console.log("port is running on server :", port);
})