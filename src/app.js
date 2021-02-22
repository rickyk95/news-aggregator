const express = require('express')

const app = express()

const http = require('http')

const path = require('path')

const server = http.createServer(app)

const socketio = require('socket.io')

const port = 4000 || process.env.PORT;


const io = socketio(server)


const { fetchVox } = require('../promises/vox.js')

const { fetchPhilArchive }  = require('../promises/philArchive.js')

const { fetchAeon } = require('../promises/aeon.js')

const { fetchNationalReview } = require('../promises/nationalReview.js')

const { fetchNewScientist } = require('../promises/newScientist.js')


//ADD MIDDLEWARE FUNCTION 
//ATTACHES IO INSTANCE TO REQ OBJECT

app.use(function(req,res,next){

      req.io = io
      next()
})

app.use(express.static(path.join(__dirname,'../views/css')))




const exphbs = require('express-handlebars')

const hbs = exphbs.create({defaultLayout:false,});


server.listen(4000,()=>{

	console.log("listening on" , port)
})


app.engine('handlebars', hbs.engine)

app.set('view engine', 'handlebars')

app.set('views',path.join(__dirname,'../views'))


var array = [fetchPhilArchive,fetchVox,fetchAeon,fetchNationalReview,fetchNewScientist]



app.get('/', async (req,res) => {
    
        res.render('home')

     try{

      array.forEach( async (outlet)=>{

          let outletArray = await outlet()

          console.log(outletArray)

          req.io.sockets.emit(outlet.name,outletArray)

      })




     }catch(e){

        res.send("Error" + e)

     }
         
           
    }) 

      







     
     





