const authorsapi = 'https://strapi-headless.onrender.com/api/authors?populate[imageauthor][fields][0]=url'

const Api = 'https://strapi-headless.onrender.com/api/books?populate[image][fields][0]=url&populate[authors][fields][0]=firstName&populate[authors][fields][1]=lastName'
 

export {Api, authorsapi}