import './App.css';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState("")
  const [res, setRes] = useState([])
  useEffect(() => {
    if(search !=="" && search.length >4){
      const url = "https://tenor.googleapis.com/v2/search?q=" + search + "&key=AIzaSyBUVnuf4H5SEY___hP-aZcR4flvdxi42ss&client_key=test_app&limit=" + 50;
      axios.get(url).then(resp => {
        console.log(resp);
        setRes(resp.data.results)
        
      });
      
    }
    
  }, [search])


  return (
    <div className="App" style={{padding: "2vw", maxWidth: 1080, margin: "auto" }}>
      <TextField value={search} onChange={e => setSearch(e.target.value)} id="outlined-basic" label="Search" variant="outlined" margin="normal" fullWidth style={{ maxWidth: "700px" }} />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-around',
          '& > :not(style)': {
            m: 1,
            height: 200,
            width: 300
          },
        }}
      >
        {res.map((item) => (
          <Paper elevation={5} style={{maxWidth: "94vw",background: ("url("+item.media_formats.gifpreview.url+")"),backgroundPosition: 'center',backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backdropFilter: 'blur(10px)', borderRadius: 5, display:'flex', alignItems: 'center', justifyContent: 'center'}} key={item.id} >
            <img src={item.media_formats.gif.url} style={item.media_formats.gif.dims[0]/item.media_formats.gif.dims[1] > 3/2 ?{width: "100%", height: "fit-content"}:{height: "100%", width: "fit-content"}} alt={item.content_description}></img>
          </Paper>
        ))}
      </Box>

    </div>
  );
}

export default App;
