import React, {useEffect, useState} from 'react';
import { 
    Typography,
    Box,
    Checkbox,
    Grid,
    TablePagination,
    makeStyles,
 } from "@material-ui/core";
import { mockHistoryArray } from "../mockdata/mockHistory";
import {TransactionHistory} from "../models/History"
import HistoryGraph from "./graph/BarGraph"


export default function TransactionDetails(){
    const [transactions, setTransactions]= useState([]);
    useEffect(()=>{
        fetchTransactionDetails()
    }, []);

    const requestTransactions={
        method: 'POST',
        header: {
            'Content-Type': 'application/json',
            'x-api-key': '895Z21koZEasz7rGcQnPw9Z3BgZUoTln4Lnda9jH'
        },
        body:{
            'custID': 3
        }
    }

    const fetchTransactionDetails=async()=>{
        const transactDetail = await fetch('https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/transactions/view', requestTransactions);
        const transactions = await transactDetail.json();
        console.log('Transaction Details: ');
        console.log(transactions);
        setTransactions(transactions);
    }

    return(
        <div>
        <HistoryGraph data = {data} />
    <div className="container">
      <header className="jumbotron">
        <Typography>
            <h2>Transaction History</h2>
            <Box my="24px" width="100%" className={classes.text}>
                <Grid container spacing={1}>
                    <Grid item md={3} xs={3}>
                        DATE
                    </Grid>
                    <Grid item md={4} xs={4}>
                        PAYEE NAME
                    </Grid>
                    <Grid item md={3} xs={3}>
                        AMOUNT ($SGD)
                    </Grid>
                    <Grid item md={1} xs={1}>
                        Type
                    </Grid>
                </Grid> 
            </Box>
            {transactions.map((transactions) => {
                //const real_date = new Date(history.date);
                {/* console.log(history.date, " to ", real_date); */}
                return (
                    <Box py="12px" my="8px" >
                    <Grid container spacing={1} alignItems="center" className={classes.text}>
                        <Grid item md={3} xs={3}>
                            {transactions.date.toLocaleDateString()}
                        </Grid>
                        <Grid item md={4} xs={4}>
                            {transactions.payeeID}
                        </Grid>
                        <Grid item md={3} xs={3}>
                            {transactions.amount}
                        </Grid>
                        <Grid item md={1} xs={1}>
                            Transaction
                        </Grid>
                    </Grid>
                    </Box>
                );
                })}
        </Typography>
      </header>
    </div>
    </div>
    )


}