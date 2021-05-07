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


export default function TransactionDetails(){

    const [transactions, setTransactions]= useState([]);

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
            const transactDetail = await fetch('https://ipllrj2mq8.execute-api.ap-southeast-1.amazonaws.com/techtrek/transactions/view', requestTransactions);
            const transactions = await transactDetail.json();
            console.log('Transaction Details: ');
            console.log(transactions);
            setTransactions(transactions);
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
                //const real_date = new Date(history.date);
                {/* console.log(history.date, " to ", real_date); */}
                return (
                    <Box py="12px" my="8px" >
                    <Grid container spacing={1} alignItems="center" className={classes.text}>
                        <Grid item md={2} xs={2}>
                            {transactions.datetime}
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
    //     <table>
    //         <tbody>
    //         <tr>
    //             <th>Date</th>
    //             <th>payeeID</th>
    //             <th>Amount</th>
    //             <th>eGift</th>
    //             <th>message</th>
    //         </tr>
            
    //         {transactions.map(transactions=>(
    //         <tr>
    //                 <th>{transactions.datetime}</th>
    //                 <th>{transactions.payeeID}</th>
    //                 <th>${transactions.amount}</th>
    //                 <th>{transactions.eGift.toString()}</th>
    //                 <th>{transactions.message}</th>
    //         </tr>))}
    //         </tbody>
    // </table>
    // )


}