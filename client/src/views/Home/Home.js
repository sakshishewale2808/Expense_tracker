import React, { useEffect, useState } from 'react';
import "./Home.css";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import TransactionCard from './../../components/TransactionCard/TransactionCard';
import ImgAdd from "./add.png";
import { Link } from 'react-router-dom';

function Home() {
  const [user, setUser] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [netIncome, setNetIncome] = useState(0);
  const [netExpense, setNetExpense] = useState(0);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    } else {
      window.location.href = '/login';
    }
  }, []);

  const loadTransactions = async () => {
    if (!user._id) return;
    toast.loading('Loading Transactions...');
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URI}/transactions?userId=${user._id}`);
      const allTransactions = response.data.data;
      setTransactions(allTransactions);
      toast.dismiss();
    } catch (error) {
      toast.error('Failed to load transactions.');
    }
  };

  useEffect(() => {
    loadTransactions();
  }, [user]);

  useEffect(() => {
    let income = 0;
    let expense = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === 'credit') {
        income += transaction.amount;
      } else {
        expense += transaction.amount;
      }
    });

    setNetIncome(income);
    setNetExpense(expense);
  }, [transactions]);

  return (
    <div>
      <h1 className='home-greeting'>Hello {user.fullName}</h1>
      <h2 className='home-heading'>Welcome To Expense Tracker</h2>
      <span className='home-logout' onClick={() => {
        localStorage.clear();
        toast.success('Logged out successfully');
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
      }}>
        Logout
      </span>
      <div className='net-transaction-value'>
        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            + {netIncome}
          </span>
          <span className='net-transaction-value-title'>
            Net Income
          </span>
        </div>
        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            - {netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Expense
          </span>
        </div>
        <div className='net-transaction-value-item'>
          <span className='net-transaction-value-amount'>
            {netIncome - netExpense}
          </span>
          <span className='net-transaction-value-title'>
            Net Balance
          </span>
        </div>
      </div>
      <div className='transactions-con'>
        {
          transactions.map((transaction) => {
            const { _id, title, amount, category, type, createdAt } = transaction;
            return (
              <TransactionCard
                key={_id}
                _id={_id}
                title={title}
                amount={amount}
                category={category}
                type={type}
                createdAt={createdAt}
                loadTransactions={loadTransactions}
              />
            );
          })
        }
      </div>
      <Link to='/add-transaction' className='add-transaction-link'>
        <img src={ImgAdd} alt='add transaction' className='add-transaction' />
      </Link>
      <Toaster />
    </div>
  );
}

export default Home;
