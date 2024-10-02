import { useState } from 'react';

export default function PriceFilter({ onFilter }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilter = () => {
    if (minPrice && maxPrice) {
      onFilter(minPrice, maxPrice); // Trigger filter with min and max price
    }
  };

  return (
    <div className='my-4 ml-6'>
      {/* <h3>Filter by Price</h3> */}
      <div>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className='mr-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-[70px] px-4 py-2 border border-gray-300 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className='mr-2 border-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-black w-[70px] px-4 py-2 border border-gray-300 rounded-lg [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
        />
        <button onClick={handleFilter} className='bg-purple-400  rounded-lg p-2'>Filter</button>
      </div>
    </div>
  );
}
