
const request = require('request')

const cheerio = require('cheerio')

const fetchPhilArchive = function() { 

  let data = []

return new Promise((resolve,reject)=>{

        request({
          method:'GET',
          url:'https://philarchive.org/'
        },(error,response,body)=>{

          if(error){

            reject(error)
          }
          let $ = cheerio.load(body)

          $("#entries .entryList").children().each((x,y)=>{



            if(x === 30){

               return false
            }

          let paper = {}
    
          paper['title'] = $(y).find(".citation").text().split('.')[0]
          paper['abstract'] = $(y).find(".abstract").text()
          paper['link']= $(y).find('.options a').attr('href')  
    
          data.push(paper)
                   
})        
          console.log("done")
          resolve(data)



})

      })

}


 module.exports={

      fetchPhilArchive

 }