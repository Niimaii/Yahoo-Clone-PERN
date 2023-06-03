import React from 'react';
import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import AddRestaurant from '../components/AddRestaurant';
import RestaurantList from '../components/RestaurantList';

const Home = () => {
  return (
    <div className='home'>
      <Header />
      <AddRestaurant />
      <RestaurantList />
    </div>
  );
};

export default Home;
