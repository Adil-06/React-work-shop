import React ,{useEffect, useState}from 'react'
import { Link } from 'react-router-dom';

const Items = () => {

    useEffect( () => {
        fetchItems();
    }, []);

    const [listItems, setListItems] = useState([])    
    const fetchItems = async() => {
      const resItems = await fetch(' https://fortnite-api.theapinetwork.com/store/get');
        const resData =  await resItems.json();
   
        console.log('response',resData.data);       
        console.log('response',resData.data[0].itemId);       
        setListItems(resData.data);

    }
    return (
        <div>
            <h1>items page</h1>
            <ul style={{listStyle:'none'}}>
                {listItems.map((data, index) => (
                   <Link to={`/items/${data.itemId}`}>
                     <li key={index}> {data.item.name} </li> 
                    </Link>
                ))}
            </ul>
        </div>
    )
}

export default Items
