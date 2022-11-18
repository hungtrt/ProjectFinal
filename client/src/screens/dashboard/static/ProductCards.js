import { Link, useParams } from "react-router-dom";
import Pagination from "../../../components/Pagination";
import Spinner from "../../../components/Spinner";
import { useGetOrdersQuery } from "../../../store/services/orderService";
const ProductCards = () => {
    let {page} = useParams();
    if(!page) {
        page = 1;
    }
    const {data = [], isFetching} = useGetOrdersQuery(page);
    return (
        <div className="mt-8">
            <h3 className="mb-8 font-bold text-base uppercase">Sản phẩm bán chạy</h3>
            {!isFetching ? (
        data?.orders?.length > 0 && (
          <>
            <div className="">
                  {data?.orders?.map((order) => (
                    <span key={order._id} className="bg-green ml-12 pt-12 rounded-lg">
                      <td className="dashboard-td text-white font-bold">{order.productId.title}</td>
                      <td className="dashboard-td text-white font-bold">{order.quantities}</td>
                      <td className="dashboard-td">
                        <img
                          src={`/images/${order.productId.image1}`}
                          alt="image"
                          className="w-[35px] h-[35px] md:w-[50px] md:h-[50px] object-cover"
                        />
                      </td>
                      <td className="dashboard-td">
                        <Link to={`/dashboard/order-details/${order._id}`} className="btn btn-warning bg-indigo-600 text-xs font-bold">
                          chi tiết
                        </Link>
                      </td>
                    </span>
                  ))}
            </div>
            <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/orders"/>
          </>
        )
      ) : (
        <Spinner />
      )}
        </div>
    )
}

export default ProductCards