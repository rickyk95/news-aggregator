const app = require('express')()
const http = require('http')

const server = http.createServer(app)

const socketio = require('socket.io')

const {fetchNewScientist, fetchPhilArchive,fetchVox,fetchNationalReview,fetchAeon} = require('./promises.js')

const io = socketio(server)

const redis = require('redis')

const client = redis.createClient()




app.use(function(req,res,next){

      req.io = io
      next()
})





const exphbs = require('express-handlebars')

const hbs = exphbs.create({defaultLayout:false,});




server.listen(4000,()=>{

	console.log("listening on" , 4000)
})


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars')









app.get('/', async (req,res) => {
    
        res.render('home')

     try{

      let newScientist = await fetchNewScientist()

      console.log(newScientist)

      req.io.sockets.emit('newScientist',newScientist)

      let philArchive = await fetchPhilArchive() 

     req.io.sockets.emit('philArchive',philArchive)

     let vox = await fetchVox()

     req.io.sockets.emit('vox',vox)

     let nationalReview = await fetchNationalReview()

     req.io.sockets.emit('nationalReview',nationalReview)

     let aeon = await fetchAeon()

     req.io.sockets.emit('aeon',aeon)



     }catch(e){

        res.send('Error loading')

     }
    
       
      
           
    }) 

      







     
     






