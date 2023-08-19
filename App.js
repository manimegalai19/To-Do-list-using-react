import React, { useState,useEffect } from 'react'
import Page from './Page.js'
import Footer from './Footer.js';
import './styles.css'
import AddItem from './AddItem.js';

const App = () => {
  //Do run Json Server 
  const [items,setItems]=useState([])
  const [SearchText,setSearchText]=useState('')
  const URL= "http://localhost:8000/items"
//To handle the Errors
  const [FetchError,SetFetchError]=useState(false)
//To show data is loading
  const [Loading,setLoading]=useState(true)
  useEffect(()=>{
     const fetchItems=async()=>{
      try{
        const response= await fetch(URL);
        if(!response.ok)throw Error("Data not received")
        const listitems=await response.json();
        setItems(listitems)
        console.log(listitems)
        setLoading(false)
      }
      catch(err){
        console.log(err.message)
        SetFetchError(true)
      }
     }
     (async()=>await fetchItems())()
  },[])
  return(
    <div className='App'>
      <header>TO DO LIST</header>
      <AddItem items={items} setItems={setItems} url={URL}/>
       
       <form className='SearchItem' onSubmit={null}> 
          <label style={{
            position:'absolute',
            left:"-100%"
             }}>Search Item</label>
          <input 
          autoFocus
          type='text'
          placeholder='Search the task'
          value={SearchText}
          onChange={(e) => {
            e.preventDefault()
            setSearchText(e.target.value);
          } }
          required /> 
      </form>
      <>
      { FetchError && <p>Some Error, Data is not Received</p> }
      { Loading && <p>loading the data</p> }
      {!Loading && !FetchError && <Page 
      //Searching times 
      items={items.filter(item=>((item.item).toLowerCase()).includes
        (SearchText.toLowerCase()))} setItems={setItems} url={URL}/>}
      <Footer length={items.length} />
      </>
    </div>
  )
}
export default App 

