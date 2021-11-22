import React, { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { Alert, AlertTitle, Button, Container, Grid, Snackbar, Typography } from '@mui/material';


const UrlForm = () => {
    const [url, setUrl] = useState("");
    const [error, setError] = useState();
    const [success, setsuccess] = useState();
    const [open, setOpen] = useState(false);
    const [short, setshort] = useState();

    const handleClose = (event, reason) => {
      setOpen(false);
      
    };
    const handleChange = (event) => {
        setUrl(event.target.value);
      };
    const shorten=(url)=>{
        return fetch("http://localhost:5000/api/shorten", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ longUrl: url })
          })
          .then(reponse => {
              return reponse.json();
    });
}
    const onSubmit = event=>{
        event.preventDefault();
        setOpen(true);
        setUrl(url);
        console.log(url);
        if(url===""){
            setError("Error field cannot be Empty")
        }
        shorten(url)
        .then(res=>{
            if(res.error){
                setError(res.error)
            }   
            else{
                setsuccess("Successfully shorten the url");
                setshort(res.shortUrl)
            }
        })
        .catch((err)=>{console.log("Shorten failed")});
    }
    const display=()=>{
        if(success && short){
            return(
                <Typography>
                   Shortened Url is: {short}
                </Typography>
            )
        }
    }
    const form=()=>{
        return (
            <Grid
                container
                spacing={4}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: '70vh' }}
            >
                <Typography variant = "h4">
                   URL Shortener
                </Typography>
                <Grid item xs={12}>
                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '100ch' },
                                align:'center'
                                }}
                            noValidate
                            autoComplete="off"
                        >
                        <TextField
                            id="outlined-name"
                            label="Long Url"
                            value={url}
                            onChange={handleChange}
                            required
                            fullWidth
                            autoFocus
                        />
                        
                        </Box>
                </Grid>   
                <Button  type="submit"
                    onClick={onSubmit}
                    variant="contained"
                    color="primary">
                            Shorten
                </Button>
                <Grid item xs={12}>
                    {display()}
                </Grid> 
                
            </Grid> 
            
        )
    }
    const errorMessage= () =>{
        return(
            <Snackbar open={(open && error)} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error">
                    {error}
                </Alert>
            </Snackbar>
        );
    };
    const successMessage= () =>{
        return(
            <Snackbar open={(open && success)} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    {success}
                </Alert>
            </Snackbar>
        );
    };

    return(
        <Container>
        {errorMessage()}
        {successMessage()}
        {form()}
        </Container>
    )
}

export default UrlForm
