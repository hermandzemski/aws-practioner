import { Alert, Collapse, Snackbar } from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";

export default function AuhtAlert() {
    const [open, setOpen] = React.useState(false);
    const [errorText, setErrorText] = React.useState('');

    const errorInterceptor = (error: any)=> {
        if (error?.response.status === 401) {
          setOpen(true);
          setErrorText('Anauthorized!')
        }
    
        if (error?.response.status === 403) {
          setOpen(true);
          setErrorText('Access Forbidden!');
        }
    
        return Promise.reject();
    };

    useEffect(() => {
        const interceptor = axios.interceptors.response.use(
            response => response,
            errorInterceptor
        );

        return () => axios.interceptors.response.eject(interceptor);
    });

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {    
        setOpen(false);
    };


    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
            <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                {errorText}
            </Alert>
        </Snackbar>
    );
}