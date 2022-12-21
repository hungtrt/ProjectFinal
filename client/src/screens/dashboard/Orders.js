import { useParams, Link } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useGetOrdersQuery } from "../../store/services/orderService";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
const Orders = () => {
  let { page } = useParams();
  page = page ? page : 1;
  const { data, isFetching } = useGetOrdersQuery(page);
  console.log(data);
  return (
    <Wrapper>
      <ScreenHeader><h3 className="text-xl font-bold">Đơn Hàng</h3></ScreenHeader>
      {!isFetching ? (
        data?.orders?.length > 0 && (
          <>
            <div className="overflow-x-auto">
              <table className="dashboard-table">
                <thead>
                  <tr className="dashboard-tr">
                    <th className="dashboard-th">Tên sản phẩm</th>
                    <th className="dashboard-th">số lượng</th>
                    <th className="dashboard-th">hình ảnh</th>
                    <th className="dashboard-th">trạng thái</th>
                    <th className="dashboard-th">Vận đơn</th>
                    <th className="dashboard-th">chi tiết</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.orders?.map((order) => (
                    <tr key={order._id} className="odd:bg-gray-800">
                      <td className="dashboard-td">{order.productId.title}</td>
                      <td className="dashboard-td">{order.quantities}</td>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${order.productId.image1}`}
                          alt="image"
                          className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover"
                        />
                      </td>
                      <td className="dashboard-td">
                        {order.received ?<h4 className="btn btn-green w-3/4 capitalize text-center">Đã nhận</h4>  : "Đang chờ"}
                      </td>
                      <td className="dashboard-td">
                        {order.status ? <h4 className="btn btn-green w-3/4 capitalize text-center">Đã duyệt</h4> : <h4 className="btn btn-warning w-3/4 text-center capitalize">Chưa duyệt</h4>}
                      </td>
                      <td className="dashboard-td">
                        <Link to={`/dashboard/order-details/${order._id}`} className="btn btn-warning bg-indigo-600 text-xs font-bold">
                          chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/orders"/>
          </>
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};

export default Orders;