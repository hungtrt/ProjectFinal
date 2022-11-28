import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import h2p from "html2plaintext";
import "react-quill/dist/quill.snow.css";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import {
  useUpdateProductMutation,
  useGetProductQuery,
} from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import Colors from "../../components/Colors";
import SizesList from "../../components/SizesList";
import { setSuccess } from "../../store/reducers/globalReducer";
import { v4 as uuidv4 } from "uuid";
import { Row, Col, Form, Input } from "antd";

const EditProduct = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const { data: product, isFetching: fetching } = useGetProductQuery(id);
  const { data = [], isFetching } = useAllCategoriesQuery();
  const [state, setState] = useState({
    title: "",
    price: 0,
    discount: 0,
    stock: 0,
    category: "",
    colors: [],
    sizes: [],
    description: "",
  });
  const [sizes] = useState([
    { name: "xsm" },
    { name: "sm" },
    { name: "md" },
    { name: "lg" },
    { name: "xl" },
    { name: "1 year" },
    { name: "2 years" },
    { name: "3 years" },
    { name: "4 years" },
    { name: "5 years" },
  ]);

  const handleInput = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const saveColors = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.hex);
    setState({
      ...state,
      colors: [...filtered, { color: color.hex }],
    });
  };
  const deleteColor = (color) => {
    const filtered = state.colors.filter((clr) => clr.color !== color.color);
    setState({ ...state, colors: filtered });
  };
  const chooseSize = (sizeObject) => {
    const filtered = state.sizes.filter(
      (size) => size.name !== sizeObject.name
    );
    setState({
      ...state,
      sizes: [...filtered, { name: sizeObject.name }],
    });
  };
  const deleteSize = (name) => {
    const filtered = state.sizes.filter((size) => size.name !== name);
    setState({ ...state, sizes: filtered });
  };

  const [updateProduct, response] = useUpdateProductMutation();

  //vi con phai truyen _id , slug ,createTime ,.... nen khong the truyen form truc tiep vao update
  const editProduct = (e) => {
    //editSize
    form.setFieldValue("sizes", state.sizes);
    //setTypeFormColor
    form.setFieldValue(
      "colors",
      state.colors.map((data) => {
        return {
          id: uuidv4(),
          color: data.color,
        };
      })
    );

    const inputEditProduct = form.getFieldsValue({ ...form });
    //add data from FormModel to state
    const dataUpdate = { ...state, ...inputEditProduct };
    updateProduct(dataUpdate);
  };

  useEffect(() => {
    if (!response.isSuccess) {
      response?.error?.data?.errors.map((err) => {
        toast.error(err.msg);
      });
    }
  }, [response?.error?.data?.errors]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (response?.isSuccess) {
      dispatch(setSuccess(response?.data?.msg));
      navigate("/dashboard/products");
    }
  }, [response?.isSuccess]);

  useEffect(() => {
    if (!fetching) {
      setState(product);
      form.setFieldsValue({...product,description : h2p(product.description)});
    }
  }, [product]);

  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i> Danh sách sản phẩm
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true} />

      {!fetching ? (
        <Row justify="space-around">
          <Col>
            <h3 className="pb-3 capitalize text-lg font-medium text-gray-400">
              Chỉnh sửa sản phẩm
            </h3>
            <Form
              form={form}
              className="editProduct"
              layout="vertical"
              onFinish={(e) => {
                editProduct(e);
              }}
            >
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="title"
                    label={<label className="label">Tên sản phẩm</label>}
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      className="form-control"
                      id="title"
                      placeholder="Tên sản phẩm..."
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="price"
                    label={<label className="label">Giá</label>}
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      type="number"
                      className="form-control"
                      id="price"
                      placeholder="Giá..."
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="discount"
                    label={<label className="label">Chiết khấu</label>}
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      type="number"
                      className="form-control"
                      id="discount"
                      placeholder="Chiết khấu..."
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="stock"
                    label={<label className="label">Số lượng</label>}
                    rules={[
                      { required: true, message: "Please input your name!" },
                    ]}
                  >
                    <Input
                      type="number"
                      className="form-control"
                      id="stock"
                      placeholder="Số lượng..."
                    />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="category"
                    label={<label className="label">Danh mục</label>}
                  >
                    {!isFetching ? (
                      data?.categories?.length > 0 && (
                        <select
                          name="category"
                          id="categories"
                          className="form-control"
                          onChange={handleInput}
                        >
                          <option value="">Chọn danh mục</option>
                          {data?.categories?.map((category) => (
                            <option value={category.name} key={category._id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      )
                    ) : (
                      <Spinner />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="colors"
                    label={<label className="label">Chọn màu sắc</label>}
                  >
                    <TwitterPicker onChangeComplete={saveColors} />
                  </Form.Item>
                </Col>
              </Row>

              <Form.Item
                name="sizes"
                label={<label className="label">Chọn kích cỡ</label>}
              >
                {sizes.length > 0 && (
                  <div className="flex flex-wrap -mx-3">
                    {sizes.map((size) => (
                      <div
                        key={size.name}
                        className="size"
                        onClick={() => chooseSize(size)}
                      >
                        {size.name}
                      </div>
                    ))}
                  </div>
                )}
              </Form.Item>

              <Form.Item
                name="description"
                label={<label className="label">Mô tả</label>}
              >
                <ReactQuill
                  name="description"
                  theme="snow"
                  id="description"
                  placeholder="Thêm mô tả..."
                />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Input
                  type="submit"
                  value={response.isLoading ? "loading..." : "Lưu sản phẩm"}
                  disabled={response.isLoading ? true : false}
                  className="btn btn-indigo"
                />
              </Form.Item>
            </Form>
          </Col>
          <Col className="w-full xl:w-4/12 p-3">
            <Colors colors={state.colors} deleteColor={deleteColor} />
            <SizesList list={state.sizes} deleteSize={deleteSize} />
          </Col>
        </Row>
      ) : (
        <Spinner />
      )}
    </Wrapper>
  );
};
export default EditProduct;
