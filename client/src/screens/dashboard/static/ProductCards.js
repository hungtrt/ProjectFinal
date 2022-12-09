import { Link, useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Spinner from "../../../components/Spinner";
import { useGetOrdersQuery } from "../../../store/services/orderService";
const ProductCards = () => {
    var moment = require('moment');
    let {page} = useParams();
    if(!page) {
        page = 1;
    }
    const {data = [], isFetching} = useGetOrdersQuery(page);

    return (
        <div className="mt-8">
            <h3 className="mb-8 font-bold text-base uppercase">Các đơn hàng đã thanh toán</h3>
            {!isFetching ? (
                data?.orders?.length > 0 && (
                <>
                    <div className="overflow-x-auto">
                    <table className="dashboard-table">
                        <thead>
                        <tr className="dashboard-tr">
                            <th className="dashboard-th text-center">Ngày thanh toán</th>
                            <th className="dashboard-th text-center">Giờ thanh toán</th>
                            <th className="dashboard-th text-center">Hình ảnh</th>
                            <th className="dashboard-th text-center">Tên sản phẩm</th>
                            <th className="dashboard-th text-center">Số lượng</th>
                            <th className="dashboard-th text-center">Giá</th>
                            <th className="dashboard-th text-center">Tổng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {data?.orders?.map((order) => {
                            let date = moment(order.createdAt).format("YYYY-MM-DD");
                            let hour = moment(order.createdAt).format("HH:mm");
                            let total = order.quantities * order.productId.stock;
                            
                            return (
                                <tr key={order._id} className="odd:bg-gray-800">
                                    <td className="dashboard-td text-center">{date}</td>
                                    <td className="dashboard-td text-center">{hour}</td>
                                    <td className="dashboard-td text-center">
                                        <img
                                        src={`/images/${order.productId.image1}`}
                                        alt="image"
                                        className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] rounded-full object-cover m-auto"
                                        />
                                    </td>
                                    <td className="dashboard-td text-center">{order.productId.title}</td>
                                    <td className="dashboard-td text-center">{order.quantities}</td>
                                    <td className="dashboard-td text-center">${order.productId.stock}</td>
                                    <td className="dashboard-td text-center">${total}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                    </div>
                    <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/sales"/>
                </>
                )
            ) : (
        <Spinner />
      )}
        </div>
    )
}

export default ProductCards