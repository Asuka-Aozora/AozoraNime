import React, { useEffect, useState } from 'react'
import { useGetopAnime } from '../hooks/useGetopAnime';
import BannerTopAnime from '../components/organism/home/BannerTopAnime';
import RecomendationsAnime from '@/components/organism/home/RecomendationsAnime';

const Home = () => {
   
  return (
    <div>
        <BannerTopAnime />
        <RecomendationsAnime/>
    </div>
  )
}

export default Home 
