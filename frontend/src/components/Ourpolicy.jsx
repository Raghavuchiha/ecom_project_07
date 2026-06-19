import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () =>{
    return(
        <div className = 'flex justify-around items-center my-10 py-10 flex-col sm:flex-row gap-8'>
            <div>
                <img src={assets.exchange_icon} className = 'w-12 auto mb-5'alt=""/>
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We offer free exchange Policy</p>
            </div>
             <div>
                <img src={assets.quality_icon} className = 'w-12 auto mb-5'alt=""/>
                <p className='font-semibold'>7 Day Return Policy</p>
                <p className='text-gray-400'>We provide 7 days return police</p>
            </div>
             <div>
                <img src={assets.support_img} className = 'w-12 auto mb-5'alt=""/>
                <p className='font-semibold'>Best Customer Support</p>
                <p className='text-gray-400'>We provide 24/7 customer support</p>
            </div>
        </div>
    )
}
export default OurPolicy;