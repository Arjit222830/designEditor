import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import axios from '../axios';
import {Link} from 'react-router-dom';

const Alert = (props)=> {

    const [data,setData]= useState(null);

    useEffect(async()=>{
        const response= await axios.get('/design');
        console.log(response.data);
        setData(response.data);
    },[]);

    if(!data)
        return <>Loading...</>

    return (
        <div>
            <Dialog
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Choose one of the following Desings"}</DialogTitle>
                <DialogContent style={{overflow:'auto',height:'50vh'}}>
                    <DialogContentText id="alert-dialog-description">
                        <Grid container spacing={3} justify="left">
                            {
                                data.length==0 && (
                                    <>
                                        No Designs Available
                                    </>
                                )||

                                data.length!=0 && data.map((item,key)=>{
                                    return (
                                        
                                        <Grid item xs={4}>
                                            <a href={`/${item._id}`} style={{color:'black',cursor:'pointer'}} onClick={props.handleClose}>
                                                File {key+1} 
                                            </a>
                                        </Grid> 
                                    )
                                })
                            }
                        </Grid>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Alert ;