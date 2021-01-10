import React,{useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import axios from 'axios'
import '../../css/table.css'
import { useLocation, useHistory } from 'react-router-dom';
function Post() {

    const [post, setpost] = useState([]);
    const token = Cookies.get('token');
    const history = useHistory();

    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(`https://localhost:44353/api/post/listpost`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            setpost(response.data);
        }

        fetchMyAPI();
    }, [post])

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <Link to="/creatpost" className="btn btn-success mt-4">Tạo bài tuyển dụng mới</Link>
                </div>
                <div className="col-md-12 pt-4">
                    <h3>Danh sách các bài tuyển dụng</h3>
                    <table className="table-fill pt-4">
                        <thead>
                            <tr>
                                <th className="text-left" style={{minWidth: "200px"}}>Vị trí</th>
                                <th className="text-left">Thông tin</th>
                                <th className="text-left" style={{minWidth: "100px"}}>Số lượng</th>
                                <th className="text-left" style={{minWidth: "300px"}}>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {post.length !== 0 ?
                                post.map((item, index) =>
                                    <tr key={index}>
                                        <td className="text-left">{item.position}</td>
                                        <td className="text-left" style={{}}>
                                            <div style={{height: "50px", overflow: "hidden"}}>
                                            {item.description}
                                            </div>
                                        </td>
                                        <td className="text-left">{item.amount}</td>
                                        <td >
                                            <div className="text-left d-flex justify-content-around">
                                            <Link className="nav-link btn btn-primary" to={{
                                                pathname: `/editpost/${item.id}`
                                            }}>Sửa thông tin</Link>
                                            <button className="btn btn-success" onClick={() => {
                                                history.push(`/apointment/${item.id}`)
                                            }}>Danh sách ứng viên</button>
                                            </div>
                                        </td>
                                    </tr>
                                ) :
                                <tr>
                                    <td colSpan="4" className="text-center">Không có thông tin</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    )
}

export default Post
