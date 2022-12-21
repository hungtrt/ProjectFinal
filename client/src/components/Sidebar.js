import { Link } from "react-router-dom";
const Sidebar = ({ side, closeSidebar }) => {
  return (
    <div className={`fixed top-0 ${side} sm:left-0 w-64 h-screen bg-gray-800 z-10 transition-all`}>
      <i className="bi bi-x-lg absolute top-4 right-4 sm:hidden block cursor-pointer text-lg" onClick={closeSidebar}></i>
      <div className="bg-white p-4 rounded-[5px]"> <img src="https://getnext.com.au/wp-content/uploads/2018/08/group-manage.png" alt="logo" /></div>
      <ul className="mt-4">
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-bookmarks-fill mr-2 inline-block text-lg"></i>{" "}
          <Link to="/dashboard/categories" className="text-base capitalize">
            danh mục
          </Link>
        </li>
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-card-list mr-2 inline-block text-lg"></i>{" "}
          <Link to="/dashboard/products" className="text-base capitalize">
            sản phẩm
          </Link>
        </li>
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-bag-check mr-2 inline-block text-lg"></i>{" "}
          <Link to="/dashboard/orders" className="text-base capitalize">
            đơn hàng
          </Link>
        </li>
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi bi-basket mr-2 inline-block text-lg"></i>{" "}
          <Link to="/dashboard/productspost" className="text-base capitalize">
            ký gửi
          </Link>
        </li>
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-cash-coin mr-2 inline-block text-lg"></i>{" "}
          <Link to="/dashboard/sales" className="text-base capitalize">
            doanh thu
          </Link>
        </li>
        <li className="px-4 cursor-pointer transition-all py-3 text-white flex items-center hover:bg-gray-600">
          <i className="bi bi-bar-chart mr-2 inline-block text-lg"></i>{" "}
          <Link to="/dashboard/statistical" className="text-base capitalize">
            Thống kê
          </Link>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;