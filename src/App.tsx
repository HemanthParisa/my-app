import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import { TextField,Button } from "@mui/material";


function App() {
  return(
    <Routes>
    <Route path='/' element={<HomeComponent />} />
    <Route path='/details' element={<DetailsComponent />} />
    </Routes>
  )
}

export default App; 

const HomeComponent = () =>{

const api_key = 'tRE38aGT2nds7cSGkARzhhS8U6hr8cKtz0IcrUTb';

const [newValue, setNewValue] =React.useState('');

const handleSubmit = (e:any) =>{
  e.preventDefault();

  fetch(`https://api.nasa.gov/neo/rest/v1/neo/${newValue}?api_key=${api_key}`)
  .then ((data)=>data.json())
  .then ((res)=> {
    localStorage.setItem("idValue",JSON.stringify(res));
   return window.open('/details')
  })
    .catch((err)=>console.log(err))
}

const handleRandomID =() =>{
  fetch(`https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=${api_key}`)
  .then((data)=>data.json())
  .then((res)=>{
    let newData = res?.near_earth_objects[Math.floor(Math.random()*19)];
    localStorage.setItem("idValue",JSON.stringify(newData));
    return window.open('/details')
  })
  .catch((err)=>console.log(err))
}



return (
  <div className="App">

  <div style={{width:'50%',margin:'50px auto'}}>
    <form onSubmit={handleSubmit}>
  <TextField placeholder="Enter Asteroid ID" value={newValue} onChange={(e)=> setNewValue(e.target.value)} />
  <div>
    <Button variant="contained" disabled={newValue?.length >0 ? false: true} type='submit'>submit</Button>
    <Button onClick={()=> handleRandomID()}>random Asteroid</Button>
  </div>
    </form>
  </div>

</div>

);
} 

const DetailsComponent =() =>{

const [values, setValues] = React.useState<any>()

React.useEffect(()=>{
const data = localStorage.getItem('idValue');

if(data){
  setValues(JSON.parse(data));
}
},[])

return (
  <div className="App">
    <p>{values?.name}</p>
    <p>{values?.is_potentially_hazardous_asteroid ? 'Yes':'No'}</p>
    <p>{values?.nasa_jpl_url}</p>
  </div>
);

}


