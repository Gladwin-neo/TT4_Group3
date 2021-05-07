import React, {useEffect, useState} from 'react';
import { 
    Typography,
    Box,
    Checkbox,
    Grid,
    TablePagination,
    makeStyles,
 } from "@material-ui/core";

export default function TransactionDetails(){

    const [transactions, setTransactions]= useState([]);
    const [transactions_translated, setTransactions_translated]= useState([]);

    const classes = makeStyles({
        text: {
        textAlign: 'center',
        fontSize: '12px',
        },
        text: {
            textAlign: 'center',
            fontSize: '12px',
        }
    });

    useEffect(()=>{
        const requestTransactions={
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': '895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH'
            },
            body:JSON.stringify({
                'custID': 3,
                'accountKey': '08enzewm-j6is-nwi8-84p0-thvmwz68bwx'
            }),
        }

        const fetchTransactionDetails=async()=>{
            const transactDetail = await fetch('https://corsanywhere.herokuapp.com/http://ec2-3-81-231-62.compute-1.amazonaws.com:5000/transactions', requestTransactions);
            const transactions = await transactDetail.json();
            console.log('Transaction Details: ');
            console.log(transactions.data);
            setTransactions(transactions.data);
        }

        fetchTransactionDetails();
        
    }, []);

    return(
    <div className="container">
      <header className="jumbotron">
        <Typography>
            <h2>Transaction History</h2>
            <Box my="24px" width="100%" className={classes.text}>
                <Grid container spacing={1}>
                    <Grid item md={2} xs={2}>
                        DATE
                    </Grid>
                    <Grid item md={2} xs={2}>
                        PAYEEID
                    </Grid>
                    <Grid item md={3} xs={3}>
                        AMOUNT ($SGD)
                    </Grid>
                    <Grid item md={1} xs={1}>
                        E-GIFT
                    </Grid>
                    <Grid item md={4} xs={4}>
                        MESSAGE
                    </Grid>
                </Grid> 
            </Box>
            {transactions.map((transactions) => {
                return (
                    <Box py="12px" my="8px" >
                    <Grid container spacing={1} alignItems="center" className={classes.text}>
                        <Grid item md={2} xs={2}>
                            {Date(transactions.datetime)}
                        </Grid>
                        <Grid item md={2} xs={2}>
                            {transactions.payeeID}
                        </Grid>
                        <Grid item md={3} xs={3}>
                            {transactions.amount}
                        </Grid>
                        <Grid item md={1} xs={1}>
                            {transactions.eGift.toString()}
                        </Grid>
                        <Grid item md={4} xs={4}>
                            {transactions.message}
                        </Grid>
                    </Grid>
                    </Box>
                );
                })}
        </Typography>
      </header>
    </div>
  );


}