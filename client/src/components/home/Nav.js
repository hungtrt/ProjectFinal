import { Link } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { BsHandbag } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Search from "./Search";
import { toggleSearchBar } from "../../store/reducers/globalReducer";
const Nav = () => {
  const { userToken, user } = useSelector((state) => state.authReducer);
  const { searchBar } = useSelector((state) => state.globalReducer);
  const { items, total } = useSelector((state) => state.cartReducer);
  console.log(total);
  const dispatch = useDispatch();
  return (
    <>
      <nav className="nav">
        <div className="my-container ">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link to="/">
                <img src="https://cdn.iconscout.com/icon/free/png-256/shopify-3627949-3029175.png" className="h-[40px] object-cover" alt="logo" />
              </Link>
              <Link to="/home" className="nav-link ml-8">Trang chủ</Link>
              <Link to="/" className="nav-link ml-16">Sản phẩm</Link>
              <Link to="/news" className="nav-link ml-16">Khuyến mãi</Link>
              <Link to="/aboutUs" className="nav-link ml-16">Liên hệ</Link>
              <Link to="/postForSale" className="nav-link ml-14">Đăng Bán</Link>
            </div>
            <ul className="flex items-center">
              <li className="nav-li cursor-pointer">
                <FiSearch size={22} onClick={() => dispatch(toggleSearchBar())} />
              </li>
              {userToken ? (
                <li className="nav-li">
                  <Link to="/user" className="nav-link">{user?.name}</Link>
                </li>
              ) : (
                <li className="nav-li">
                  <Link to="/login" className="nav-link">
                    Đăng nhập
                  </Link>
                </li>
              )}

              <li className="nav-li relative">
                <Link to="/cart">
                  <BsHandbag size={20} />
                  <span className="nav-circle">{items}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Search />
    </>
  );
};
export default Nav;
