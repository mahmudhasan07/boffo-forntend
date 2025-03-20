import AllCollection from '@/components/AllCollection';
import Banner from '@/components/banner/Banner';
// import MensCollections from '@/components/MensCollections';
import NewArrival from '@/feature/products/NewArrival';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: "Boffo",
//   description: "An E-commerce platform where you find your products",
//   metadataBase: new URL("https://boffo-global.com"), // Set correct domain
//   icons: {
//     icon: "https://res.cloudinary.com/daudgshta/image/upload/v1742486791/Boffo/logo_nn4hxi.png",
//   },
//   openGraph: {
//     images: [
//       {
//         url: "https://res.cloudinary.com/daudgshta/image/upload/v1742486812/Boffo/titleImage_jddtvo.png", // Add the logo as the image
//         alt: "Boffo Title", // Optional alt text for the image
//       },
//     ],
//   },
// };


const page = () => {
  return (
    <div>
      <Banner />
      <NewArrival />
      {/* <MensCollections /> */}
      <AllCollection />
    </div>
  );
};

export default page;