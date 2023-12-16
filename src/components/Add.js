import React,{useState} from 'react'
import axios from 'axios'
import {Link,} from 'react-router-dom'

export default function Add(props) {
    
    const[height,setHeight]=useState("");
    const[age,setAge]=useState("");
    const[weight,setWeight]=useState("");
    const[bmi,setBmi]=useState("");
    const[cal1,setCal]=useState("");
    const[col,setCol]=useState("");
    const ch1=(e)=>{
        setAge(e.target.value);
    }
    const ch2=(e)=>{
        setWeight(e.target.value);
    }
    const ch3=(e)=>{
        setHeight(e.target.value);
    }
    const ch4=(e)=>{
       e.preventDefault()
    }
    const ch5=(e)=>{
       
        
     }
    
    const bmical=async()=>{
       let cal=0;
       let bmi="";
       let  heightInm=height/100;
        let value=(weight)/(heightInm*heightInm);
        let  bmiValue=value.toFixed(1);
         cal=bmiValue;
         setCal(cal);
        console.log(cal);
        if(bmiValue<18.5){
            bmi="UnderWeight"
            setBmi(bmi);
            setCol("green");
        }
        else if( bmiValue<25){
            bmi="Normal"
            setBmi(bmi);
            setCol("aqua");
        }
        else if(bmiValue<30){
            bmi="OverWeight"
            setBmi(bmi);
            setCol("red");
        }
        else{
            bmi="obese"
            setBmi(bmi);
            setCol("orange");

        }
        let data={
            height,weight,cal,bmi
        }
        if(props.toogle==='f'){
        setTimeout(()=>{
            axios.post('http://localhost:3001/add',data).then((response)=>{
        
        if (response.status === 200) {
            console.log(cal)
            console.log("Connected to server and data saved successfully.");
            
          } else {
            console.error("Error saving data to server:", response.data);
          }
    }).catch((error)=>{
        console.log(error);
    })
        },1000)
        
        
    }
    else {
      console.log(props.toogle);
        axios.put(`http://localhost:3001/update/${props.id}`)
        .then(()=>{
          console.log('updated');
        })
        .catch((error)=>{
          console.log(error);
        })
    }
    }
    
  return (
    <div>
    <div className='container' style={{width:"50vw",float:"left",marginLeft:"150px"}}>
    <Link to="/"><button>List</button></Link>
      <form style={{marginTop:"100px" , width:"30vw",border:"2px solid black",padding:"10px"}}>
        
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Age</label>
    <input type="number" className="form-control" value={age} onChange={ch1}/>
</div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Weight(kg)</label>
    <input type="number" className="form-control" id="exampleInputPassword1" value={weight} onChange={ch2}/>
    
  </div>
  <div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="fosrm-label">Height(cm)</label>
    <input type="number" className="form-control" id="exampleInputPasswor"  value={height} onChange={ch3}/>
  </div>
  <div className="mb-3">
  <label htmlFor="exampleInputPassword1" className="fosrm-label">BMI value</label>
    <input type="number" className="form-control" id="exampleInputPasswor"  value={cal1} onChange={ch4}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={e=>{bmical();e.preventDefault()}}>Calculate</button>
</form>
    </div>
    <div style={{float:"right",width:"30vw",marginRight:"100px"}}>
    <form className="form-floating" style={{marginTop:"100px" , width:"20vw"}}>
  <input type="text" className="form-control" id="floatingInputValue"  value={bmi} style={{border:"2px solid black",padding:"10px",backgroundColor:col}} onChange={ch5}/>
  <label htmlFor="floatingInputValue">BMI</label>
</form>

    </div>
    </div>
  )
}


