import React,  {useEffect, useState} from 'react';
import { 
    Typography,
    Box,
    Checkbox,
    Grid,
    TablePagination,
    makeStyles,
 } from "@material-ui/core"


export default function AcctDetails() {
    const [account, setAccount]= useState();
    useEffect(()=>{
        
        const methods = {
            method: 'POST',
            header: {
                'Content/type':'application/json',
                'x-api-key': '895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH',
            },
            body: JSON.stringify({
                "custId": 3,
                "accountKey": '08enzewm-j6is-nwi8-84p0-thvmwz68bwx'
            })
        }
        const fetchAcctDets =async()=> {
            const accountDetails = await fetch (
                `https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/accounts`,methods
            );
            const account = await accountDetails.json();
            console.log('Account Details: ');
            console.log(account);
            setAccount(JSON.stringify(account));
            
        }
        fetchAcctDets()
    }, []);
    
    return(
        <div>
            
                return (
                    <Box py="12px" my="8px" >
                    <Grid container spacing={1} alignItems="center" >
                        <Grid item md={3} xs={3}>
                            {account}
                        </Grid>
                        <Grid item md={4} xs={4}>
                            {account}
                        </Grid>
                        <Grid item md={3} xs={3}>
                            {account}
                        </Grid>
                        <Grid item md={1} xs={1}>
                            Transaction
                        </Grid>
                    </Grid>
                    </Box>
                )
            
        
        </div>
    )
};