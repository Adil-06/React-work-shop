import React,{useState, useCallback, useEffect} from 'react'
import style from './Movie.module.css'
import AddMovieForm from './AddMovieForm';
import Movies from './Movies';

function MoviesList(props) {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false);

    // get a movies
    const fetchMovieHandler = useCallback ( async () => {
        setLoading(true);
        const respone = await fetch('https://react-http-workshop-default-rtdb.firebaseio.com/movies.json')
        try {
            const resData = await respone.json()
            const fetchedMovies = [];
            for (const key in resData) {
                fetchedMovies.push({
                    id: key,
                    title : resData[key].title,
                    text : resData[key].description,
                    date: resData[key].date,
                    producer: resData[key].producer
                });
            }
            setMovies(fetchedMovies)
            setLoading(false);
        }
        catch (err) {    console.log("error is:",err.message)  }
       
    } , []);

    useEffect( () => {
        fetchMovieHandler();
    }, [fetchMovieHandler]);

    //post a movie
    async function addMovieHandler(movie) {
        const respone = await fetch("https://react-http-workshop-default-rtdb.firebaseio.com/movies.json", {
            method : 'POST',
            body : JSON.stringify(movie),
            headers : {
                'Content-Type' : 'application/json'
            }
        })
        const resData =  await respone.json()
        console.log("from moive list component",resData);
      }
    
    return (
        <React.Fragment>
            <div className={style.movieContainer}>
                <AddMovieForm onAddMovie ={addMovieHandler}/>
                <div>
                    <button className={style.fetchbtn} onClick={fetchMovieHandler}> Fetch movies</button>
                </div>
                <div>
                   {!loading && <ul className={style.moviesList}>
                        {movies.map((movie, index) => (
                            <Movies key={index}
                                title={movie.title}
                                text={movie.text}
                                date={movie.date}
                                producer ={movie.producer} />
                        ))}
                    </ul> }
                    {loading && <p>Loading  Movies Data....</p>}
                    {!loading && movies.length === 0 && <h2>No Movies Found Yet</h2>}
                </div>
            </div>

        </React.Fragment>
    )
}

export default MoviesList
