import React from "react";
import ContactCard from "./Contactcard"
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Contactlst = (props) =>{
    const renderContactList = props.contacts.map((contact) =>{
        return (
            
        <ContactCard contact={contact}/>
        );
    })
    return(
        <div className="ui celled list">
            {renderContactList}
        </div>
    )
}

export default Contactlst;