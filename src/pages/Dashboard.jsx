import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useAction, getUser, getTransactions, getSlots, depositMoney, requestWithdrawal, playSlot } from 'wasp/client/operations';

const DashboardPage = () => {
  const { data: user, isLoading: userLoading, error: userError } = useQuery(getUser);
  const { data: transactions, isLoading: transactionsLoading, error: transactionsError } = useQuery(getTransactions);
  const { data: slots, isLoading: slotsLoading, error: slotsError } = useQuery(getSlots);
  const depositMoneyFn = useAction(depositMoney);
  const requestWithdrawalFn = useAction(requestWithdrawal);
  const playSlotFn = useAction(playSlot);

  if (userLoading || transactionsLoading || slotsLoading) return 'Loading...';
  if (userError || transactionsError || slotsError) return 'Error: ' + (userError || transactionsError || slotsError);

  const handleDeposit = (amount) => {
    depositMoneyFn({ amount });
  };

  const handleWithdrawal = (amount) => {
    requestWithdrawalFn({ amount });
  };

  const handlePlaySlot = (betAmount) => {
    playSlotFn({ betAmount });
  };

  return (
    <div className='p-4'>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold mb-2'>Account Details</h2>
        <div className='bg-gray-100 p-4 rounded-lg'>
          <div>Username: {user.username}</div>
          <div>Email: {user.email}</div>
          <div>Balance: {user.balance}</div>
        </div>
      </div>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold mb-2'>Transactions</h2>
        {transactions.map((transaction) => (
          <div key={transaction.id} className='bg-gray-100 p-4 rounded-lg mb-2'>
            <div>Amount: {transaction.amount}</div>
            <div>Type: {transaction.type}</div>
            <div>Status: {transaction.status}</div>
          </div>
        ))}
      </div>
      <div className='mb-4'>
        <h2 className='text-2xl font-bold mb-2'>Slots</h2>
        {slots.map((slot) => (
          <div key={slot.id} className='bg-gray-100 p-4 rounded-lg mb-2'>
            <div>Reels: {slot.reels}</div>
            <div>RTP: {slot.RTP}</div>
          </div>
        ))}
      </div>
      <div className='flex justify-between'>
        <button onClick={() => handleDeposit(100)} className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>Deposit $100</button>
        <button onClick={() => handleWithdrawal(50)} className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>Withdraw $50</button>
        <button onClick={() => handlePlaySlot(10)} className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'>Play Slot $10</button>
      </div>
    </div>
  );
}

export default DashboardPage;