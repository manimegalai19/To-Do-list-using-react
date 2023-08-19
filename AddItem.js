import React, { useState } from 'react'
import JsonApi from './JsonApi.js';
import './styles.css'
const AddItem = ( {items,setItems,url}) => {
    const [text,settext]=useState('')
    const handleCreateItem=(text)=>{
        text.trim();
        if(text.length){
        const id=items.length?items[items.length-1].id+1:1;
        const NewItem={id:id,checked:false,item:text}
        const listitems=[...items,NewItem]
        setItems(listitems)
        settext('')
        const PostObject={
           method:'POST',
           headers:{
            'Content-Type':'application/json'
           },
           body:JSON.stringify(NewItem)
        }
        const result=JsonApi(url,PostObject)
        if(result){ console.log(result) }
      }
      }
  return (
    <div>
    <form  className='AddItem' onSubmit={null}>
    <label style={{
      position:'absolute',
      left:"-100%"
    }}>
      Add Item</label>
    <input
    autoFocus
    type='text'
    placeholder='Enter the task'
    value={text}
    onChange={(e) => {
      e.preventDefault()
      settext(e.target.value);
    } }
    required />
    <button onClick={() => handleCreateItem(text)}>Add Item</button>
    </form>
    </div>
  )
}

export default AddItem