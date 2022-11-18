import Header from "../../components/home/Nav";
import Footer from "../../components/Footer";
import Contact from "../../components/home/AboutUs/Contact";

const AboutUs = () => {
  return (
    <div className=" bg-footer">
        <Header/>
        <div className="pt-4 mb-10">
            <Contact/>
        </div>
        <Footer/>
    </div>
  )
}

export default AboutUs