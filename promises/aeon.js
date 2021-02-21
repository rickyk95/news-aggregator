const request = require('request')

const cheerio = require('cheerio')


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


module.exports = {

	fetchAeon
}