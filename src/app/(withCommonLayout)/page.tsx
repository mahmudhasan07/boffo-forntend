import AllCollection from '@/components/AllCollection';
import Banner from '@/components/banner/Banner';
// import MensCollections from '@/components/MensCollections';
import NewArrival from '@/feature/products/NewArrival';



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