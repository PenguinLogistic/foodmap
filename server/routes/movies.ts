import express from 'express'
import axios from 'axios'

const router = express.Router()

router.get('/', async(req:express.Request, res:express.Response) => {
    const { keyword, type,  year} = req.query
    if(!keyword){
        return res.send("Gib keyword")
    }

    let movieList = []
    let page = 1

    while (page < 5) {
        let response = await axios.get(`http://www.omdbapi.com/?page=${page}&s=${keyword}&apikey=${process.env.API_KEY}`)
        if (response.status==200 && response.data["totalResults"] && parseInt(response.data["totalResults"],10) > 0) {
            for (let item of response.data["Search"]) {
                const id = item["imdbID"]
                const recordResponse = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}`)
                if (recordResponse.status === 200) {
                    movieList.push(recordResponse.data)
                }
            }
            page++
        } else {
            break;
        }
    }

    const result = movieList
        .filter((item) => {
            let compareYear = false
            if(year){
                const parsed: Number[] = item.Year.includes("–") ? 
                    item.Year.split("–").map(year => parseInt(year,10)) : [parseInt(item.Year, 10)] 
                
                    if(item.Year.includes("–")) {
                        compareYear = year >= parsed[0] && (parsed[1] ? year <= parsed[1] : true)
                    } else {
                        compareYear = year == parsed[0]
                    }
            }
  
        return (type ? item.Type == type : true) && (year ? compareYear : true)
        })

        .sort((a,b) => {
            const ratingA = parseFloat(a.imdbRating)
            const ratingB = parseFloat(b.imdbRating)

            return ratingB - ratingA
        })

    return res.json({result, totalResults: result.length})
})

// router.get('/asdf', async(req:express.Request, res:express.Response) => {
//     const { keyword } = req.query
//     if(!keyword){
//         return res.send("Gib keyword")
//     }

//     let response = await axios.get(`http://www.omdbapi.com?s=${keyword}&apikey=${process.env.API_KEY}`)
//     if (response.status==200) {
//         return res.json(response.data)
//     }
//     return res.send("Could not find movie data")

// })
export default router