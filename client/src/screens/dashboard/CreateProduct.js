import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { TwitterPicker } from "react-color";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import toast, { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper";
import { useAllCategoriesQuery } from "../../store/services/categoryService";
import { useCProductMutation } from "../../store/services/productService";
import Spinner from "../../components/Spinner";
import Colors from "../../components/Colors";
import SizesList from "../../components/SizesList";
import ImagesPreview from "../../components/ImagesPreview";
import { setSuccess } from "../../store/reducers/globalReducer";
import { Row, Col, Form, Input } from "antd";

const CreateProduct = () => {
  const [form] = Form.useForm();
  const { data = [], isFetching } = useAllCategoriesQuery();
  const [value, setValue] = useState("");
  const [state, setState] = useState({
    colors: [],
    sizes: [],
    image1: "",
    image2: "",
    image3: "",
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
  //luu image vao 2 state(preview va state) vi 1 ben can dang du lieu render , 1 ben luu vao database
  const [preview, setPreview] = useState({
    image1: "",
    image2: "",
    image3: "",
  });

  const imageHandle = (e) => {
    if (e.target.files.length !== 0) {
      const reader = new FileReader();
      setState({ ...state, [e.target.name]: e.target.files[0] });
      reader.onloadend = () => {
        setPreview({ ...preview, [e.target.name]: reader.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
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
  const [createNewProduct, response] = useCProductMutation();

  const createProduct = (e) => {
    const formData = new FormData();
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
    //setTypeFormSize
    form.setFieldValue("sizes", state.sizes);

    const data = form.getFieldsValue({ ...form });
    
    formData.append("data", JSON.stringify(data));
    formData.append("image1", state.image1);
    formData.append("image2", state.image2);
    formData.append("image3", state.image3);
    
    createNewProduct(formData);
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
  return (
    <Wrapper>
      <ScreenHeader>
        <Link to="/dashboard/products" className="btn-dark">
          <i className="bi bi-arrow-left-short"></i> danh sách sản phẩm
        </Link>
      </ScreenHeader>
      <Toaster position="top-right" reverseOrder={true} />
      <Row justify="space-around">
        <Col>
          <Form
            form={form}
            // className="createProduct"
            layout="vertical"
            onFinish={(e) => {
              createProduct(e);
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

            {/* vì khi xử lí onChange cần lấy ra được name input để setState */}
            <Form.Item
              name="image1"
              label={<label className="label">Ảnh 1</label>}
            >
              <Input
                name="image1"
                type="file"
                className="input-file"
                id="image1"
                onChange={imageHandle}
              />
            </Form.Item> 

            <Form.Item
              name="image2"
              label={<label className="label">Ảnh 2</label>}
            >
              <Input
                name="image2"
                type="file"
                className="input-file"
                id="image2"
                onChange={imageHandle}
              />
            </Form.Item>

            <Form.Item
              name="image3"
              label={<label className="label">Ảnh 3</label>}
            >
              <Input
                name="image3"
                type="file"
                className="input-file"
                id="image3"
                onChange={imageHandle}
              />
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
          <ImagesPreview url={preview.image1} heading="ảnh 1" />
          <ImagesPreview url={preview.image2} heading="ảnh 2" />
          <ImagesPreview url={preview.image3} heading="ảnh 3" />
        </Col>
      </Row>
    </Wrapper>
  );
};
export default CreateProduct;
