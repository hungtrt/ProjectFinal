import { Link } from "react-router-dom"
import Footer from "../../components/Footer"

const Landing = () => {
  return (
    <div class="big-wrapper light">
        <img src="./images/landing/shape.png" alt="" class="shape" />

        <header>
          <div class="container">
            <div class="logoLanding">
              <img src="./images/landing/logo.png" alt="Logo" />
              <h3>VietHan Musical</h3>
            </div>

            <div class="links">
              <ul>
                <li><Link to="/home">Trang chủ</Link></li>
                <li><Link to="/">Sản phẩm</Link></li>
                <li><Link to="/news">Khuyến mãi</Link></li>
                <li><Link to="/aboutUs">Liên hệ</Link></li>
                <li><Link to="/" className="btnn" >Mua ngay</Link></li>
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
                <h1>Đặt hàng liền tay,</h1>
                <h1>Trúng ngay voucher!</h1>
              </div>
              <p class="text">
                Nhanh tay đặt ngay sản phẩm từ Nhạc cụ Việt Hàn để nhận ngay các ưu đãi trong ngày hôm nay.
              </p>
              <div class="cta">
                <a href="#" class="btnn">Xem sản phẩm</a>
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