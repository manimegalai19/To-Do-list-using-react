import React from 'react'
import './styles.css'
import { FaTrash } from "react-icons/fa";
import JsonApi from './JsonApi.js';

const Page = ({items,setItems,url}) => {
  const handlecheck=async(id)=>{
    const listitems=items.map((item)=>(
      item.id===id?{...item,checked:!item.checked}:item)
    )
    setItems(listitems)

    const UpdateNeededItem=listitems.filter((item)=>(
      item.id===id
    ))
    const PatchObject={
      method:'PATCH',
      headers:{
       'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:UpdateNeededItem[0].checked})
   }
   const reqUrl=`${url}/${id}`
   const result= await JsonApi(reqUrl,PatchObject)
   if(result){ console.log(result) } 
  }
  const handledelete=async (id)=>{
    const listitems=items.filter((item)=>(
      item.id!==id?item:""
    ))
    setItems(listitems)

    const DeleteObject={method :'DELETE'}
    const reqUrl=`${url}/${id}`
    const result= await JsonApi(reqUrl,DeleteObject)
    if(result){ console.log(result) }
  }
  
  return (
    <div className='Page'>
          {(items.length)?(
          <ul className='ItemList'>
            {items.map((item) => (
              <li className='item' key={item.id}>
                <input
                  className='input'
                  type='checkbox'
                  checked={item.checked}
                  //()=> Very important to stop frequent rendering
                  //Important when passing parameter
                  onChange={() => handlecheck(item.id)} />
                <label
                  style={item.checked ? {
                    textDecoration: 'line-through'
                  } : null}
                  onClick={() => handlecheck(item.id)}>{item.item}</label>
                <FaTrash className='delete'
                  onClick={() => handledelete(item.id)} />
              </li>
            ))}
          </ul>
      ):(
        <p style={{marginTop:'3rem'}}>Your List is Empty</p>
      )}
    </div>
  )
}
export default Page