import {useState, useEffect} from "react"
import {useAuthLoginMutation} from "../../store/services/authService"
import {useDispatch} from "react-redux"
import { useNavigate } from "react-router-dom"
import { setAdminToken } from "../../store/reducers/authReducer"
const AdminLogin = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const handleInputs = e => {
        setState({...state, [e.target.name]: e.target.value })
    }
    const [login, response] = useAuthLoginMutation();
    console.log('my response', response)
    const errors = response?.error?.data?.errors ? response?.error?.data?.errors : [];
    const adminLoginFunction = e => {
        e.preventDefault();
        login(state);
    }
    const dispatch = useDispatch();
    useEffect(() => {
        if(response.isSuccess) {
            localStorage.setItem('admin-token', response?.data?.token);
            dispatch(setAdminToken(response?.data?.token));
            navigate('/dashboard/products');
        }
    }, [response.isSuccess])
    return(
        <div className="login-box">
            <div class="logo">
                <span class="logo-font">Dashboard</span>Manager
            </div>
            <form className="bg-slate-500 p-4 sm:w-max md:w-6/12 lg:w-3/12 rounded mt-20 ml-36 form-login" onSubmit={adminLoginFunction}>
                <h3 className="mb-4 text-white capitalize font-semibold text-lg">dashboard login</h3>
                    {errors.length > 0 && errors.map((error, key) => (
                <div key={key}>
                    <p className="alert-danger">{error.msg}</p>
                </div>
                    )) }
                <div className="mb-4 mt-4">
                    <input type="email" name="email" className="w-full bg-slate-100 p-3 rounded outline-none text-gray-800" onChange={handleInputs} value={state.email} placeholder="Nhập email..." />
                </div>
                <div className="mb-4">
                    <input type="password" name="password" className="w-full bg-slate-100 p-3 rounded outline-none text-gray-800" onChange={handleInputs} value={state.password} placeholder="Nhập password..." />                    </div>
                <div className="mb-4">
                    <input type="submit" value={response.isLoading ? 'Loading...' : 'Đăng nhập'} className="bg-green-500 w-full p-3 rounded text-white uppercase font-semibold cursor-pointer" />
                </div>
            </form>
            <div>
                <div class="slider-feature-card -mt-64 rounded-xl w-60">
                    <img src="https://sales.webtel.in/images/Login-page-character1.png" alt="" className="ml-2"/>
                    <h3 class="slider-title font-bold">ADMIN</h3>
                    <p class="slider-description font-base">Bảo mật, thân thiện, tiện ích là những gì chúng tôi đem lại cho bạn!</p>
                </div>
            </div>
        </div>
    )
}
export default AdminLogin;