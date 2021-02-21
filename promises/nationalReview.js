const request = require('request')

const cheerio = require('cheerio')

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

module.exports = {

  fetchNationalReview
}