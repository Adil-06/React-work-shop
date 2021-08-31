import React from 'react'
import style from './Movie.module.css'

function Movies(props) {
    const title = props.title.toUpperCase()
    return (
        <React.Fragment>
            <li className = {style.movie}>
                <h2> {title}</h2>
                <h3> <b>Description :</b> {props.text}</h3>
                <p><b>Date :</b> {props.date}</p>
                <p> <b>Producer :</b> {props.producer}</p>
            </li>
        </React.Fragment>
    )
}

export default Movies
