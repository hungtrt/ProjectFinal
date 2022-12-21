import { Link } from "react-router-dom"
import Footer from "../../components/Footer"

const Landing = () => {
  return (
    <div class="big-wrapper light">
        <img src="./images/landing/shape.png" alt="" class="shape" />

        <header>
          <div class="container">
            <div class="logoLanding">
              <img src="https://cdn.iconscout.com/icon/free/png-256/shopify-3627949-3029175.png" alt="Logo" />
              <h3>DaNang Saler</h3>
            </div>

            <div class="links">
              <ul>
                <li><Link to="/home">Trang chủ</Link></li>
                <li><Link to="/">Sản phẩm</Link></li>
                <li><Link to="/news">Khuyến mãi</Link></li>
                <li><Link to="/aboutUs">Liên hệ</Link></li>
                <li><Link to="/postForSale" className="btnn" >Đăng bán</Link></li>
              </ul>
            </div>

            <div class="overlay"></div>

            <div class="hamburger-menu">
              <div class="bar"></div>
            </div>
          </div>
        </header>

        <div class="showcase-area">
          <div class="container">
            <div class="left">
              <div class="big-title">
                <h1>Mua bán liền tay,</h1>
                <h1>Trúng ngay voucher!</h1>
              </div>
              <p class="text">
                Nhanh tay đặt ngay sản phẩm từ DaNang Saler để nhận ngay các ưu đãi trong ngày hôm nay.
              </p>
              <div class="cta">
                <Link to="/" className="btnn">Xem sản phẩm</Link>
              </div>
            </div>

            <div class="right">
              <img src="./images/landing/person.png" alt="Person Image" class="person" />
            </div>
          </div>
        </div>

        <div class="bottom-area">
          <div class="container">
            <button class="toggle-btn"></button>
          </div>
        </div>
        <div className="mt-6">
            <Footer/>
        </div>
    </div>
  )
}

export default Landing