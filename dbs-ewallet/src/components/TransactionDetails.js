import React, {useEffect, useState} from 'react';

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
        <table>
            <tr>
                <th>Date</th>
                <th>PayeeID</th>
                <th>Amount</th>
                <th>eGift</th>
                <th>message</th>
            </tr>

            {
                transactions.map((transactions)=>(
                    <th>{transactions.date}</th>,
                    <th>{transactions.payeeID}</th>,
                    <th>${transactions.amount}</th>,
                    <th>{transactions.eGift}</th>,
                    <th>{transactions.message}</th>
                ))
            }

        </table>
    )


}