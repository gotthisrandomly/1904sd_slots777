import React from 'react';
import { useAction, playSlot } from 'wasp/client/operations';

const SlotPage = () => {
  const playSlotFn = useAction(playSlot);

  const handlePlaySlot = () => {
    playSlotFn({}).then((response) => {
      alert(`Result: ${response.result}, New Balance: ${response.newBalance}`);
    });
  };

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Slot Machine Game</h1>
      <div className='flex items-center justify-center'>
        <button
          onClick={handlePlaySlot}
          className='bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded'
        >
          Play Slot
        </button>
      </div>
    </div>
  );
}

export default SlotPage;