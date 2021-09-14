import React ,{useEffect, useState}from 'react'

const ItemDetails = ({match}) => {

    useEffect( () => {
       fetchItem();
       console.log(match.params.id)
    }, [match.params.id]);

    const [item, setItem] = useState({
      images : {}
    })    
    const fetchItem = async() => {
     
     const resItems = await fetch(`https://fortnite-api.theapinetwork.com/item/get?id=${match.params.id}`);
        const resData =  await resItems.json();
   
        console.log('response',resData.data);       
        setItem(resData.data.item); 

    }
    return (
        <div>
             <h1>  {item.description}</h1> 
             <img src={item.images.icon} alt={item.images.information} style={{background : 'black'}} />            
        </div>
    )
}

export default ItemDetails
