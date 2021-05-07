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
    const [account, setAccount]= useState([]);
    useEffect(()=>{
        
        const methods = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                'x-api-key': '895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH',
            },
            body: JSON.stringify({
                'custID': 3,
                'accountKey': "08enzewm-j6is-nwi8-84p0-thvmwz68bwx"
            })
        }
        const fetchAcctDets = async() => {
            const accountDetails = await fetch (
                'https://corsanywhere.herokuapp.com/http://ec2-3-81-231-62.compute-1.amazonaws.com:5000/balance',methods
            );
            const account = await accountDetails.json();
            console.log('Account Details: ');
            console.log(account.data);
            setAccount(account.data);
            
        }
        fetchAcctDets()
    }, []);
    
    return(
        <div>
            <Typography>
            <Box my="24px" width="100%">
                <Grid container spacing={1} alignItems="center">
                    <Grid item md={3} xs={3}>
                        Account Type
                    </Grid>
                    <Grid item md={4} xs={4 }>
                        Account Number
                    </Grid>
                    <Grid item md={3} xs={3}>
                        Available Balance
                    </Grid>
                    <Grid item md={1} xs={1}>
                        Bank Information ID
                    </Grid>
                    
                </Grid> 
            </Box>
            {account.map((accounts) => {
                return (
                    <Box py="12px" my="8px" >
                    <Grid container spacing={1} alignItems="center" >
                        <Grid item md={3} xs={3}>
                            {accounts.accountName}
                        </Grid>
                        <Grid item md={4} xs={4}>
                            {accounts.accountNumber}
                        </Grid>
                        <Grid item md={3} xs={3}>
                            {accounts.availableBal}
                        </Grid>
                        <Grid item md={1} xs={1}>
                            {accounts.bankInfoID}
                        </Grid>
                    </Grid>
                    </Box>
                );
                    
            })}
            
            </Typography>
        </div>
    )
};