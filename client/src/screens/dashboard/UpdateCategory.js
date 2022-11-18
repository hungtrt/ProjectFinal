import {Link, useNavigate, useParams} from "react-router-dom"
import {useState, useEffect} from "react"
import { useDispatch } from "react-redux"
import ScreenHeader from "../../components/ScreenHeader";
import Wrapper from "./Wrapper"
import { setSuccess } from "../../store/reducers/globalReducer";
import { useFetchCategoryQuery, useUpdateCategoryMutation } from "../../store/services/categoryService";
import Spinner from "../../components/Spinner";
const UpdateCategory = () => {
    const [state, setState] = useState('');
    const {id} = useParams();
    const {data, isFetching} = useFetchCategoryQuery(id);
    console.log('category data: ',data)
    useEffect(() => {
        data?.category && setState(data?.category?.name);
    }, [data?.category])
    const [saveCategory, response] = useUpdateCategoryMutation();
    console.log(response)
     const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];
    const updateSubmit = e => {
       e.preventDefault();
       saveCategory({name: state, id});
   }
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
       if(response?.isSuccess) {
           dispatch(setSuccess(response?.data?.message));
          navigate('/dashboard/categories');
       }
   }, [response?.isSuccess])
    return(
       <Wrapper>
           <ScreenHeader>
              <Link to="/dashboard/categories" className="btn-dark"><i className="bi bi-arrow-left-short"></i>Danh sách danh mục</Link>
           </ScreenHeader>
           {!isFetching ? <form className="w-full md:w-8/12" onSubmit={updateSubmit}>
               <h3 className="text-lg capitalize mb-3">Cập nhật danh mục</h3>
               {errors.length > 0 && errors.map((error, key) => (
                   <p className="alert-danger" key={key}>{error.msg}</p>
               ))}
               <div className="mb-3">
                   <input type="text" name="" className="form-control" placeholder="tên danh mục..." value={state} onChange={(e) => setState(e.target.value)} />
               </div>
               <div className="mb-3">
                   <input type="submit" value='cập nhật' className="btn btn-indigo" />
               </div>
           </form> : <Spinner />}
       </Wrapper>
    )
}
export default UpdateCategory;