// import React from 'react'
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from '@mui/material';
// import * as React from 'react';
// import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';

// import BasicTextFields from './Input';
import axios from "axios"
// import { useState } from 'react';
// import FormDialog from './Modal';

export const Home = () => {

    const [data,setData]=React.useState([])
    const [open, setOpen] = React.useState(false);
    const [id,setId]=React.useState(0)
    const [country,setCountry]=React.useState("")
    const [city,setCity]=React.useState("")
     const [population,setPopulation]=React.useState(0)
     const [length,setLength]=React.useState(0)
     const [type,setType]=React.useState("")


    const Initial_fetch=()=>{
        axios({
            method:"get",
            url:"http://localhost:3002/Country"
        })
        .then((res)=>{setData(res.data);setLength(res.data.length)})
        .catch((err)=>{console.log(err)})
    }

    React.useEffect(()=>{
        Initial_fetch()
    },[type])

    const handleDelete=(id)=>{
        console.log(id)

        axios({
            method:"delete",
            url:`http://localhost:3002/Country/${id}`
        })

        Initial_fetch()
    }

   
   

    const handleClickOpen = (e,id,country,city,population) => {
      // console.log(e.target.innerText)
        if(e.target.value==="addCity"){
            setId(id)
            setType(e.target.innerText)
        }
        else{
            setType(e.target.innerText)
            setId(id)
            setCountry(country)
            setCity(city)
            setPopulation(population)
        }
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleSubmit=()=>{
        // console.log(e.target.innerText)
      console.log(type)
      if(type==="ADD CITY"){
            axios.post("http://localhost:3002/Country",{id,country,city,population}) 
          .then((res)=>{console.log(res)})
          .catch(err=>{console.log(err)})
      }
      else if(type==="EDIT"){
        console.log("hi")
        axios({
          method:"patch",
          url:`http://localhost:3002/Country/${id}`,
       
          data:{
            id,
            country,
            city,
            population
          }
      // })
        })
  
      }
        // console.log(id)
        // console.log(country,city,population)

        // else{
      

        Initial_fetch()
        handleClose()
    }

  return (
    <div>
         <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Country</TableCell>
            <TableCell align="right">City</TableCell>
            <TableCell align="right">Population</TableCell>
            <TableCell align="right">Edit</TableCell>
            <TableCell align="right">Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((ele) => (
            <TableRow
              key={ele.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
            <TableCell align="right">{ele.id}</TableCell>
              <TableCell component="th" scope="row">
                {ele.country}
              </TableCell>
              <TableCell align="right">{ele.city}</TableCell>
              <TableCell align="right">{ele.population}</TableCell>
              <TableCell align="right"><Button onClick={(e)=>handleClickOpen(e,ele.id,ele.country,ele.city,ele.population)}>Edit</Button></TableCell>
              <TableCell align="right"><Button onClick={()=>{handleDelete(ele.id)}}>Delete</Button></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit-{id}</DialogTitle>
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Country" variant="outlined" value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="City" variant="outlined" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
    </Box>
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField id="outlined-basic" label="Population" variant="outlined" onChange={(e)=>{setPopulation(e.target.value)}} value={population} />
    </Box>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e)=>{handleSubmit(e)}}>Submit</Button>
        </DialogActions>
      </Dialog>
      
      <Button style={{marginTop:"30px"}} variant="outlined" onClick={(e)=>handleClickOpen(e,length+1)} >Add City</Button>
    </div>
  )
}
