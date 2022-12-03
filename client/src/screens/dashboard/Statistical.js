import { Link, useParams } from "react-router-dom";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import Spinner from "../../components/Spinner";
import Pagination from "../../components/Pagination";
import { useGetQuery } from "../../store/services/categoryService";
import { useGetProductsQuery ,useGetAllProductQuery } from "../../store/services/productService";
import { Pie } from "@ant-design/plots";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import { useEffect ,useState } from "react";


const DemoPie = (props) => {
  const data = props.data;
  
  const config = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    color: ["#E37460", "#3DBD78","#66CC66","#009999","#333366"],
    radius: 1,
    innerRadius: 0.66,

    statistic: {
      title: {
        customHtml: (container, view, datum) => {
          let text;
          if (datum) {
            text = datum.type;
          } else {
            text = `<span>Total</span/>`;
            return text;
          }
          return text;
        },
      },

      content: {
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const value = `${
            datum ? datum.value : data.reduce((r, d) => r + d.value, 0)
          }`;
          const percent = Math.round(
            (value / data.reduce((r, d) => r + d.value, 0)) * 100
          );
          return percent + "%";
        },
      },
    },
    legend: {
      position: "bottom",
      itemName: {
        formatter: (text, item) => {
          if (text == "Không có hợp đồng") {
            return "Cuộc hẹn " + text;
          } else {
            return text;
          }
        },
      },
    },
    interactions: [
      {
        type: "pie-statistic-active",
      },
      { type: "tooltip" },
    ],
  };
  return <Pie {...config} />;
};

const Statistical = () => {
  let { page } = useParams();
  if (!page) {
    page = 1;
  }
  const { data : dataCategory, isFetchingAllProduct : fetchingCategory } = useAllCategoriesQuery();
  const { data : dataProduct, isFetchingAllProduct : fetchingProduct } = useGetAllProductQuery();
  const { data = [], isFetching } = useGetProductsQuery(page);
  
  const [ quantityCategory , setQuantityCategory ] = useState([]);

  useEffect(() => {
    let rs = [];
    let category = [];
    dataProduct?.map((item, index) => {
      if (!category.includes(item.category)) {
        category.push(item.category);
        rs.push({
          type : item.category,
          value : item.stock,
        })
      }
      else {
        rs.filter((itemRs, index) => itemRs.type == item.category)[0].value += item.stock;
      }
    })

    setQuantityCategory(rs);
  },[dataProduct]);

  return (
    <Wrapper>
      <ScreenHeader>
        <h3 className="text-2xl font-bold text-center">Thống kê</h3>
      </ScreenHeader>
      {!isFetching ? (
        data?.products?.length > 0 ? (
         <div>
          <div className="flex justify-between mt-20 mb-40">
            <div className="w-2/4 px-10">
              <h3 className="pl-10 text-gray-300 text-lg">
                Tất cả mặt hàng hiện có :
              </h3>
              <table className="my-10 w-full bg-gray-900 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-5 uppercase text-sm font-medium text-gray-500">
                      Tên
                    </th>
                    <th className="p-5 uppercase text-sm font-medium text-gray-500">
                      số lượng
                    </th>
                    <th className="p-5 uppercase text-sm font-medium text-gray-500">
                      Chi tiết
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product) => (
                    <tr className="odd:bg-gray-800" key={product._id}>
                      <td className="p-5 capitalize text-sm font-normal text-gray-400">
                        {product.title}
                      </td>
                      <td className="p-5 capitalize text-sm font-normal text-gray-400">
                        {product.stock}
                      </td>
                      <td className="p-5 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/product/${product._id}`}
                          className="btn btn-green"
                        >
                          Chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={parseInt(page)}
                perPage={data.perPage}
                count={data.count}
                path="dashboard/statistical"
              />
            </div>
            <div className="w-2/4">
              <h3 className="pl-20 text-gray-300 text-lg">
                  Phân loại : 
              </h3>
              <DemoPie data={quantityCategory} />
            </div>
          </div>
          <div className="flex justify-between mt-20 mb-40">
            <div className="w-2/4 flex justify-center">
              <div className="w-3/4 border border-gray-600 rounded-none md:rounded-md p-4">
                <h3 className="text-gray-300 text-lg text-center">
                  Thể loại :
                </h3>

                <div className="border-b p-3 border-b-gray-600">
                  <h4 className="capitalize text-base text-gray-500">Đàn</h4>
                  <span className="text-gray-400 text-base font-medium capitalize mt-3">
                    123
                  </span>
                </div>
                <div className="border-b p-3 border-b-gray-600">
                  <h4 className="capitalize text-base text-gray-500">Trống</h4>
                  <span className="text-gray-400 text-base font-medium capitalize mt-3">
                    123
                  </span>
                </div>

                <div className="border-b p-3 border-b-gray-600">
                  <h4 className="capitalize text-base text-gray-500">Sáo</h4>
                  <span className="text-gray-400 text-base font-medium capitalize mt-3">
                    123
                  </span>
                </div>

                <div className="border-b p-3 border-b-gray-600">
                  <h4 className="capitalize text-base text-gray-500">Kèn</h4>
                  <span className="text-gray-400 text-base font-medium capitalize mt-3">
                    123
                  </span>
                </div>
              </div>
            </div>
            
            <div className="w-2/4 px-10">
              <h3 className="pl-10 text-gray-300 text-lg">
                Thể loại : Đàn
              </h3>
              <table className="my-10 w-full bg-gray-900 rounded-md">
                <thead>
                  <tr className="border-b border-gray-800 text-left">
                    <th className="p-5 uppercase text-sm font-medium text-gray-500">
                      Tên
                    </th>
                    <th className="p-5 uppercase text-sm font-medium text-gray-500">
                      số lượng
                    </th>
                    <th className="p-5 uppercase text-sm font-medium text-gray-500">
                      Chi tiết
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.products?.map((product) => (
                    <tr className="odd:bg-gray-800" key={product._id}>
                      <td className="p-5 capitalize text-sm font-normal text-gray-400">
                        {product.title}
                      </td>
                      <td className="p-5 capitalize text-sm font-normal text-gray-400">
                        {product.stock}
                      </td>
                      <td className="p-5 capitalize text-sm font-normal text-gray-400">
                        <Link
                          to={`/product/${product._id}`}
                          className="btn btn-green"
                        >
                          Chi tiết
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Pagination
                page={parseInt(page)}
                perPage={data.perPage}
                count={data.count}
                path="dashboard/statistical"
              />
            </div>
            
          </div>
         </div>
        ) : (
          "Chưa có sản phẩm nào!"
        )
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};
export default Statistical;
