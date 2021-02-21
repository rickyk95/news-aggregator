const request = require('request')

const cheerio = require('cheerio')


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


module.exports = {

		fetchNewScientist
}
