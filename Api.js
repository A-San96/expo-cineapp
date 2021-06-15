export const processMovies = movie => (
    {
        title: movie.Title,
        year: movie.Year,
        poster: movie.Poster,
        rated: movie.Rated,
        runtime: movie.Runtime,
        description: movie.Plot,
        rating: movie.Ratings //e.g:[{"Source":"Internet Movie Database","Value":"6.7/10"}]
        //ratingValue: movie.Ratings.Value,
    }
)

export const processMoviesInHome = movie => (
    {
        title: movie.Title,
        year: movie.Year,
        type: movie.Type,
        poster: movie.Poster,
        imdbID: movie.imdbID
    }
)

const apiBaseLink = "http://www.omdbapi.com/?apikey=7aed27c5"

export const fetchResults = async (page,searchValue) => {

        let link = apiBaseLink+"&s="+searchValue+"&page="+String(page)
        const resp = await fetch(link)
        const results =  await resp.json()
        const response =await results.Response
        if (response==="True") {
            const data = await results.Search//.map(processMoviesInHome)
            return data.map(processMoviesInHome) 
        }
        return "No data"
}


export const fetchMovieInfo = async (value) => {

        let link = apiBaseLink+"&i="+value
        let resp = await fetch(link)  
        const result =  await resp.json()
        /*/const response =await result.Response
        if (response=="True") {
            return processMovies({result})
        }*/
        return processMovies(result)
        //return "Network Error"

}
