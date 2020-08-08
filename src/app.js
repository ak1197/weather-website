const path=require('path')
const express = require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app = express()

// Configuring Path for Express engine
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Configure setting for hanlebars
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Configure static file path to serve 
app.use(express.static(publicDirectoryPath))



app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather",
        name:"Arunkumar"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Arunkumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Arunkumar',
        message:'This page will help you to know your weather forecast'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide a valid address!'
        })
    }
    geocode(req.query.address,(error,{Latitude,Longitude,Location}={})=>{
        if(error){
            return res.send({
                error:error
            })
        }
        forecast(Latitude,Longitude,(error,forecatdata)=>{
            if(error){
                return res.send({
                    error:error
                })
            }
            res.send({
                Location : Location,
                ForeCast : forecatdata
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Arunkumar',
        message:'Help document not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Arunkumar',
        message:'Page not found.'
    })
})


app.listen(3000,()=>{
    console.log('Server is up on 3000...')
})