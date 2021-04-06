const path = require('path')
const { response } = require('express')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

// console.log(__dirname);
// console.log(path.join(__dirname,'../public'))
const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebar engines and view location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//static directory to server
app.use(express.static(publicDirectoryPath))

// app.get('/',(req,res)=>{
//     res.send('Hello Express')
// })
// app.get('/help',(req,res)=>{
//     res.send('Help Page')
// })
// app.get('/about',(req,res)=>{
//     res.send('fwf')
// })


app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query);
    res.send({
        prducts:[]
    })
})

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather',
        name:'Raj Goyal'
    })
})
app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About',
        name:'Raj Goyal'
    })
})
app.get('/help',(req, res)=>{
    res.render('help',{
        title:'Help',
        name:'Raj Goyal'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"please provide address"
        })
    }
    
    geocode(req.query.address,(error,{latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                address:req.query.address,
                location,
                forecastData                
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        message:'Help article not found',
        name:'Raj',
        title:'404'
    })
})

//* means wildcard character which states that match everything that hasn't been matched yet
app.get('*',(req,res)=>{
    res.render('404',{
        message:'page not found',
        name:'Raj',
        title:'404'
    })
})

app.listen(3000,()=>{
    console.log('server is up on port 3000')
})