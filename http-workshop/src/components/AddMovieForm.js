import React, {useRef} from 'react'
import style from './AddMovie.module.css'

function AddMovieForm(props) {
    const titleRef = useRef('');
    const dateRef = useRef('');
    const descriptionRef = useRef('');
    const producerRef = useRef('');

    const formHandler = (event) => {
        event.preventDefault();
        const movie = {
            title : titleRef.current.value,
            description : descriptionRef.current.value,
            date : dateRef.current.value,
            producer : producerRef.current.value
        }
        //console.log(movie);
        props.onAddMovie(movie);

        // clearing the inputs
        titleRef.current.value = '';
        descriptionRef.current.value = '';
        dateRef.current.value = '' ;
        producerRef.current.value = '';
    }
    return (
        <div className={style.AddMovieForm}>
            <form onSubmit={formHandler}>
                <div className={style.control}>
                    <label htmlFor='title'>Title</label>
                    <input type="text" id="title" ref={titleRef} required />
                </div>
                <div className={style.control}>
                    <label htmlFor='description'>Description</label>
                    <textarea rows='5' id="description"  ref={descriptionRef} required/>
                </div>                
                <div className={style.control}>
                    <label htmlFor='date'>Date</label>
                    <input type="date" id="date" ref={dateRef} required/>
                </div>
                <div className={style.control}>
                    <label htmlFor='producer'>Producer</label>
                    <input type="text" id="producer" ref={producerRef} required />
                </div>                
                <div>
                   <button type="submit" className={style.formbtn}> Submit</button>
                </div>
            </form>
        </div>
    )
}

export default AddMovieForm
