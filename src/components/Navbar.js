import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { useDispatch} from 'react-redux'
import {logout} from '../redux/User/userAction'
function Navbar() {

    const dispatch = useDispatch();

    const handleLoggout = () => {
        dispatch(logout());
        Cookies.remove('token');
    }

    const auth = useSelector(state => state.login);
    return (
        <div>
            <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                <Link className="navbar-brand" to="/">MyCV</Link>

                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link className="nav-link" to="/">Home</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/candidate">Tìm ứng viên</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/post">Tin tuyển dụng</Link>
                    </li>
                    {auth ?
                        <Fragment>
                            <li className="nav-item">
                                <button className="nav-link" style={{
                                    backgroundColor: '#343a40',
                                    color: '#ffffff8',
                                    border: 'none',}
                                    } onClick={handleLoggout}>Đăng xuất</button>
                            </li>
                        </Fragment> :
                        <Fragment>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Đăng nhập</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signin">Đăng ký</Link>
                            </li>
                        </Fragment>
                    }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar
