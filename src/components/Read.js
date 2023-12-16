import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom';
export default function Read(props) {
    const[data,setData]=useState([]);
      const load=async()=>{
        const response=await axios.get('http://localhost:3001/read')
        setData(response.data);
      };
      useEffect(()=>{
        load();
      },[]);
      const deleteTask=(id)=>{
       axios.delete(`http://localhost:3001/delete/${id}`)
       .then(()=>{
        setTimeout(()=>load(),500);
        console.log("deleted")
       })
       .catch((error)=>{
        console.log(error);
       })
      }
  return (
    <div style={{width:"50vw", marginLeft:"100px",marginTop:"150px"}}>
      <Link to="/ad"><button className='btn btn-success' style={{alignItems:'center',display:'inline-block'}}>Add+</button></Link>
      <table className='table' style={{border:'3px', borderCollapse:'collapse', margin:'auto', maxWidth:'800px', boxShadow:'0 0 20 px rgba(0,0,0,0.15)'}}>
        <thead style={{backgroundColor:'#009879', color:'#ffffff', textAlign:'left'}}>
            <tr>
                
         <th>Height</th>
         <th>Weight</th>
         <th>BMiCal</th>
         <th>Bmi</th>
         </tr>
        </thead>
        <tbody style={{borderBottom:'1px solid #dddddd'}}>
            {data.map((item,index) => {
                return(
                    
                <tr key={index}>
                    
                    <td>{item.height}</td>
                    <td>{item.weight}</td>
                    <td>{item.cal}</td>
                    <td>{item.bmi}</td>
                <button onClick={e=>{props.id(item._id);e.preventDefault()}}><Link to="/update">Update</Link></button>
                    <button  onClick={e=>{deleteTask(item._id); e.preventDefault()}}>Delete</button>
                    </tr>
                )
            })}
           </tbody>
           </table>
    </div>
  )
}
