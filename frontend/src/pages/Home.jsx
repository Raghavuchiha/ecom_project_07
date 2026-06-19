import React from 'react';
import Hero from '../components/Hero';
import LatestCollection from '../components/LatestCollection';
import OurPolicy from '../components/Ourpolicy';
import BestSeller from '../components/best'
import Newsletter from '../components/Newsletter';
import Footer from '../components/footer';
import Categories from '../components/category';

const Home = () => {
  return (
    <div>
        <Hero />
        <Categories/>
        <LatestCollection/>
        <BestSeller/>
        <OurPolicy/>
        <Newsletter/>
        
    </div>
  );
};

export default Home;