import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({ category }) => {
  // FIX 1: Destructure 'food_list' instead of 'food'
  const { food_list, url } = useContext(StoreContext); 

  // FIX 2: Check 'food_list'
  if (!food_list || food_list.length === 0) {
    return (
      <div className='food-display' id='food-display'>
        <h2>Top dishes near you</h2>
        <p>Loading dishes...</p>
      </div>
    );
  }

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-display-list'>
        {/* FIX 3: Map over 'food_list' */}
        {food_list.map((item, index) => {
          if (category === 'All' || category === item.category) {
            // Note: I'm assuming your FoodItem component is correct
            return (
              <FoodItem
                key={item._id || index}
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image} // Assuming item.image is the full path or you build it here
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;