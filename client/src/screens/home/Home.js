import Categories from "../../components/home/Categories";
import HomeProduct from "../../components/home/HomeProduct";
import Nav from "../../components/home/Nav";
import Slider from "../../components/home/Slider";
import { useRandomCategoriesQuery } from "../../store/services/categoryService";
import Footer from "../../components/Footer";

const Home = () => {
  const { data, isFetching } = useRandomCategoriesQuery();
  return (
    <div className="bg-footer">
      <Nav />
      <div className="mt-[70px]">
        <Slider />
      </div>
      <div className="my-container mt-10">
        <Categories />
        {!isFetching &&
          data?.categories?.length > 0 &&
          data?.categories.map((category) => (
            <HomeProduct category={category} key={category._id} />
          ))}
      </div>
        <Footer/>
    </div>
  );
};
export default Home;
