 
const cheerio = require('cheerio')
const request = require('request')
const nodemailer = require('nodemailer')





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



const fetchAeon = function() { 

  let aeonArticlesArray = [];

return new Promise((resolve,reject)=>{

  request({
  method:'GET',
  url:'https://aeon.co/philosophy'
}, (error,response,body)=>{

  if(error){

      reject(error)

  }

  let $ = cheerio.load(body)

  const articles = $('div.article-list.container').children()


  


  articles.each((x,y)=>{

      let article = { }

      article['link']= 'https://aeon.co' + $(y).find('a.article-card__link').attr('href')
      article['title']= $(y).find('a.article-card__title').text()
      aeonArticlesArray.push(article)
  })

  console.log(aeonArticlesArray)
  resolve(aeonArticlesArray)

 })

})

}

const fetchNationalReview = function() { 

let nationalReviewArticles = [];

return new Promise((resolve,reject)=>{

     request({
          method:'GET',
          url:'https://www.nationalreview.com/news/?utm_source=menu&utm_medium=desktop&utm_campaign=sections&utm_term=second&utm_content=news'
        },(error,response,body)=>{

          if(error){

            reject(error)
          }

          const $ = cheerio.load(body)
          const articles = $('.post-list.post-list--linear').children()
          articles.each((x,y)=>{

            let article = {}

            article['title'] = $(y).find('a').text().trim()
            article['link'] = $(y).find('a').attr('href')
            nationalReviewArticles.push(article)

          
          })

           
            resolve(nationalReviewArticles)
          
        })




})

}

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


var transport = nodemailer.createTransport({
  service: "Gmail",
  port:4000,
  auth: {
    user: "epistemicmind2017@gmail.com", 
    pass: "cnemsiiblktfrgaj"
  }
});

var mailOptions = {
  from: 'epistemicmind2017@gmail.com',
  to: 'epistemicmind2017@gmail.com',
  subject: 'Your Daily Newsletter',
  
  html:undefined       
}



const fetchNewScientist = function (){

    let newScientistArray = [];

    return  new Promise((resolve,reject)=>{



        request({method:'GET',
                 url:'https://newscientist.com'},(error,response,body)=>{

                  const $ = cheerio.load(body)

                  
                 

                  const articles = $('.section-article-list.section-article-list--three-col').children()


                   articles.each((x,y)=>{

                        let obj = {}

                        if($(y).find('.card__heading').html() !== null) {

                            obj['title'] = $(y).find('.card__heading').html()
                            obj['link'] = 'https://newscientist.com' + $(y).find('.card__link').attr('href')

                            newScientistArray.push(obj)

                        }
                        


                   })

             
                    
                 

                  resolve(newScientistArray)  

                  

                 })


      })



};


module.exports = {fetchNewScientist,fetchPhilArchive,fetchVox,fetchNationalReview,fetchAeon}













