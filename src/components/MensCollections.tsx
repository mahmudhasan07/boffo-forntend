import Image from 'next/image';
import React from 'react';
import mens from "@/assets/dynamic/image.png"
const MensCollections = () => {
    return (
        <div className='container  section-gap'>
            <div className='rounded-md relative'>
                <Image src={mens} alt='' width={1200} height={1200} className='w-full 2xl:h-[700px] xl:h-[600px] lg:h-[600px] md:h-[650px] sm:h-[700px] h-[500px] object-cover rounded-md' />
                <div className='absolute top-20 left-7' >
                    <p className='text-xl font-semibold text-white uppercase'><span className='bg-primary p-1 text-white'>Mens</span> <br /> <span className='text-white/80 p-1 bg-black text-white'> Collection</span></p>
                </div>
                <div className='absolute bottom-20 left-7' >
                    <p className='text-2xl font-semibold text-white uppercase'><span className='text-sm text-white/80'>Stride in</span> <br /> Ethereal Edge <br /><span className='text-base'>Modern Take on Nature’s Palette </span></p>
                    <button className='px-6 py-2 border text-white drop-shadow-lg bg-white/20 hover:bg-primary hover:border-transparent transition-all rounded-full'>
                        Shop Now
                    </button>
                </div>
            </div>

        </div>
    );
};

export default MensCollections;