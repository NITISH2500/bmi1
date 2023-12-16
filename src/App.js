import './App.css';
import { useState } from 'react';
import  Add from './components/Add'
import Read from './components/Read'
import{
  BrowserRouter,
  Route,
  Routes,
  
} from "react-router-dom"

function App() {
  const [id,setId]=useState("");
  const change=(id)=>{
  setId(id);
  console.log(id);
  }
  return (
    <>
    <BrowserRouter>
    
    <Routes>
      <Route exact path="/" element={<Read id={change}/>}/>
      <Route exact path="/ad" element={<Add toogle="f"/>}/>
      <Route exact path="/update" element={<Add id={id} toogle="t"/>}/>
    </Routes>
    </BrowserRouter>
   
    </>
  );
}

export default App;
