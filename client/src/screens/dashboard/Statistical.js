import {Link, useParams} from "react-router-dom"
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper"
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { useGetQuery } from "../../store/services/categoryService";
import { useGetProductsQuery } from "../../store/services/productService";
const Statistical = () => {
   let {page} = useParams();
   if(!page) {
      page = 1;
   }
    const {data = [], isFetching} = useGetProductsQuery(page);
    return(
       <Wrapper>
           <ScreenHeader>
           </ScreenHeader>
           {!isFetching ? data?.products?.length > 0 ? <div>
            <table className="w-full bg-gray-900 rounded-md">
            <thead>
                    <tr className="border-b border-gray-800 text-left">
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Tên</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">số lượng</th>
                       <th className="p-3 uppercase text-sm font-medium text-gray-500">Chi tiết</th>
                    </tr>
                 </thead>
                 <tbody>
                  {data?.products?.map(product => (
                     <tr className="odd:bg-gray-800" key={product._id}>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.category}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400">{product.stock}</td>
                        <td className="p-3 capitalize text-sm font-normal text-gray-400"><Link to={`/product/${product._id}`} className="btn btn-green">Chi tiết</Link></td>
                     </tr>
                  ))}
                 </tbody>
            </table>
            <Pagination page={parseInt(page)} perPage={data.perPage} count={data.count} path="dashboard/statistical" />
          </div> : 'Chưa có sản phẩm nào!' : <Spinner />}
       </Wrapper>
    )
}
export default Statistical;