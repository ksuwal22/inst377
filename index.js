const express = require('express')
var bodyParser = require('body-parser')
const supabaseClient = require('@supabase/supabase-js')
const app = express()
const port = 3000;
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));

const supabaseUrl = 'https://rwcbbsmytiacmilrkfhy.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3Y2Jic215dGlhY21pbHJrZmh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI2NTY2NjgsImV4cCI6MjAxODIzMjY2OH0.rXG-aQPh5ipR8ELsGIKiqSpT5jfiwQ8K52Kk9h4Afe8'
const supabase = supabaseClient.createClient(supabaseUrl, supabaseKey);

app.get('/', (req, res) => {
    res.sendFile('public/Week10.html', { root: __dirname })
})

app.get('/customers', async (req, res) => {
    console.log(`Getting Customer`)

    const {data, error} = await supabase
        .from('Customer')
        .select();

    if(error) {
        console.log(error)
    } else if(data) {
        res.send(data)
    }
})

app.post('/customer', async (req, res) => {
    console.log('Adding Customer')

    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var state = req.body.state;

    const {data, error} = await supabase
        .from('Customer')
        .insert([
            {'customer_first_name': firstName, 'customer_last_name': lastName, 'customer_state': state}
        ])
        .select();

    console.log(data)
    res.header('Content-type', 'application/json')
    res.send(data)
})

app.listen(port, () => {
    console.log('APP IS ALIVEEEEEE')
})