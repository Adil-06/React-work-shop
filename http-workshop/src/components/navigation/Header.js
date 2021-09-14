import React from 'react'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () =>  {
    return (
        <div>
            <nav className="navigation">
                <span> React Routing</span>
                <ul>
                    <Link to='/' className='linkColor'>
                     <li> Home</li>
                    </Link>
                    <Link to='/movies' className='linkColor'>
                     <li> Movies</li>
                    </Link>
                    <Link to='/items' className='linkColor'>
                     <li> Items</li> 
                    </Link>
                    <Link to='/about'className='linkColor' >
                     <li> About</li>
                    </Link>
                </ul>
            </nav>
            
        </div>
    )
}

export default Header
