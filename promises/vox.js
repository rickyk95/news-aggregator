const request = require('request')

const cheerio = require('cheerio')


const fetchVox =  function () {

  let voxArticlesArray = [];

  return new Promise((resolve,reject)=>{

    

request({
          method:'GET',
          url:'https://www.vox.com/'
        },(error,response,body)=>{

          if(error){

            reject(error)
          }

          const $ = cheerio.load(body)
          const articles = $('.c-entry-box--compact__title')

         

            articles.each((x,y)=>{

                  let object = {}

                object['title'] = $(y).text()
                object['link'] = $(y).find('a').attr('href')

                voxArticlesArray.push(object)
            })

         
          console.log("done")
          
          resolve(voxArticlesArray)


})

})

 }

 module.exports={

 			fetchVox
 }