import Footer from "../../components/Footer";
import Nav from "../../components/home/Nav";
import Card from "../../components/home/News/Card";
import MainPanel from "../../components/home/News/MainPanel";
import NewsApi from "../../components/home/News/NewsApi";

const New = () => {
  return (
    <div className="bg-footer">
        <Nav/>
        <div className="main_panel">
        <MainPanel/>
      </div>

      <section className='Portfolio Blog' id='blog'>
        <div className='container_about top'>
          <div className='heading text-center' id="flag">
            <br/>
            <h4>Đặt liền tay nhận ngay voucher</h4>
            <h1 className="mt-10">Tin Tức</h1>
          </div>

          <div className='content grid_about'>
            {NewsApi.map((value, index) => {
              return <Card
              key={index} 
              image={value.image} 
              date={value.date} 
              title_one={value.title_one} 
              title_two={value.title_two} 
              title_three={value.title_three} 
              desc_one={value.desc_one} 
              desc_two={value.desc_two} 
              desc_three={value.desc_three} />
            })}
          </div>
        </div>
      </section>
        <Footer/>
    </div>
  )
}

export default New