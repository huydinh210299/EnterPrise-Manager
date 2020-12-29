import React from 'react'
import { useSelector , useDispatch} from 'react-redux'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from "axios";
import Cookies from 'js-cookie'
import {login} from '../../redux/User/userAction';


const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Không được để trống';
    }

    if (!values.password) {
        errors.password = 'Không được để trống';
    } else if (values.password.length < 6) {
        errors.password = 'Mật khẩu không được ít hơn 6 ký tự';
    }

    return errors;
};

function Login() {

    const auth = useSelector(state => state.login);
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        validate,
        onSubmit: async values => {
            const rs = await axios.post('https://localhost:44353/api/ent/login',values);
            const data = rs.data;
            if(data.token){
                dispatch(login(data.token));
                Cookies.set('token', data.token, {expires : 7})
            }
            if(data.statusCode === 400){
                alert("Đăng nhập thất bại. Kiểm tra lại thông tin")
            }
        },
    });

    return (
        <div className="container">
            {auth ?
                <div className="row justify-content-center mt-5">
                    <Link to="/">Bạn đã đăng nhập. Quay lại trang chính</Link>
                </div> :
                (
                    <form onSubmit={formik.handleSubmit} style={{
                        width: '500px',
                        margin: 'auto',
                        marginTop: '40px'}}>
                        <div className="form-group">
                            <label htmlFor="email">Username:</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                            <div className="text-danger">{formik.errors.username ? <div>{formik.errors.username}</div> : null}</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password:</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <div className="text-danger">
                                {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                )
            }
        </div>
    )
}

export default Login
