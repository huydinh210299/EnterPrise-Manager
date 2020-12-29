import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import '../../css/table.css'
import Cookies from 'js-cookie'
import { Modal, Button } from 'react-bootstrap';

function Candidate() {
    let localtion = useLocation();
    //token
    const token = Cookies.get('token');
    // Candidate
    const [Candidate, setCandidate] = useState([]);
    const [School, setSchool] = useState("");
    const [user, setuser] = useState("")
    const [DisablePrev, setDisablePrev] = useState(false);
    const [DisableNext, setDisableNext] = useState(false);
    const history = useHistory();

    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        let el = e.target;
        let userID = el.getAttribute("data_id");
        setuser(userID);
        setShow(true);
    }

    const handleInvite = (e) => {
        let postID = document.getElementsByClassName('post')[0].value;
        axios.post(`https://localhost:44353/api/contact/entcreate`,{
            userid : user,
            postid : postID
        } ,
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(res => {
            if(res.data.statusCode === 200){
                alert("Mời ứng tuyển thành công");
            }
            else{
                alert("Ứng viên đã được mời ứng tuyển");
            }
        }
        )
        .catch(err => console.log(err));


        setShow(false);
    }

    // Listpost
    const [post, setpost] = useState([]);

    const handleClickNext = (e) => {
        let { page, school } = queryString.parse(localtion.search);
        if (page) {
            let Page = ++page;
            history.push(
                {
                    pathname: '/candidate',
                    search: `?page=${Page}&school=${School}`,
                }
            )
        }
        else {
            history.push(
                {
                    pathname: '/candidate',
                    search: `?page=2&school=${School}`,
                }
            )
        }
    }

    const handleClickPrev = (e) => {
        let { page, school } = queryString.parse(localtion.search);
        if (page && page > 1) {
            let Page = --page;
            history.push(
                {
                    pathname: '/candidate',
                    search: `?page=${Page}&school=${School}`,
                }
            )
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let { page, school } = queryString.parse(localtion.search);
        if (!page) page = 1;

        history.push(
            {
                pathname: '/candidate',
                search: `?page=${page}&school=${School}`,
            }
        )
    }
    useEffect(() => {
        let { page, school } = queryString.parse(localtion.search);
        if (page && parseInt(page) > 1) {
            setDisablePrev(false);
        } else setDisablePrev(true);
        axios.get(`https://localhost:44353/api/user/list`, { params: { page: page, school: school } })
            .then(res => {
                setCandidate(res.data);
                res.data.length === 0 ? setDisableNext(true) : setDisableNext(false)
            }
            )
            .catch(err => console.log(err));

        axios.get(`https://localhost:44353/api/post/listpost`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
            .then(res => {
                setpost(res.data);
            }
            )
            .catch(err => console.log(err));

    }, [localtion])

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-12">
                    <form onSubmit={handleSubmit} className="form-inline">
                        <div className="form-group">
                            <label htmlFor="school" className="mr-3">Trường:</label>
                            <input type="text" className="form-control mr-3" style={{ minWidth: "500px", }}
                                placeholder="Nhập tên trường muốn tìm kiếm?" id="school"
                                value={School} onChange={(e) => setSchool(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Tìm</button>
                    </form>
                </div>
            </div>
            <div className="container mt-5 mb-5">
                <div className="list-job-wrapper  mt-5">
                    <table className="table-fill">
                        <thead>
                            <tr>
                                <th className="text-left">Tên</th>
                                <th className="text-left">Trường</th>
                                <th className="text-left">SĐT</th>
                                <th className="text-left">Email</th>
                                <th className="text-left">CV</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {Candidate.length !== 0 ?
                                Candidate.map((item, index) =>
                                    <tr key={index}>
                                        <td className="text-left">{item.name}</td>
                                        <td className="text-left">{item.school}</td>
                                        <td className="text-left">{item.phone}</td>
                                        <td className="text-left">{item.email}</td>
                                        <td className="text-left d-flex justify-content-around">
                                            <button className="btn btn-primary" onClick={() => {
                                                history.push(`/cvinfo/${item.id}`)
                                            }} data={item.ID}>Xem CV</button>
                                            <Button variant="success" onClick={handleShow} data_id={item.id}>Mời ứng tuyển</Button>
                                        </td>
                                    </tr>
                                ) :
                                <tr>
                                    <td colSpan="5" className="text-center">Không có thông tin</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <nav aria-label="Page navigation example" className="d-flex justify-content-center">
                        <ul className="pagination">
                            {
                                DisablePrev ?
                                    <li className="page-item"><button className="page-link" disabled onClick={handleClickPrev}>Previous</button></li> :
                                    <li className="page-item"><button className="page-link" onClick={handleClickPrev}>Previous</button></li>
                            }
                            {
                                DisableNext ?
                                    <li className="page-item"><button className="page-link" disabled onClick={handleClickNext}>Next</button></li> :
                                    <li className="page-item"><button className="page-link" onClick={handleClickNext}>Next</button></li>
                            }
                        </ul>
                    </nav>
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách việc làm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        post.length == 0 ?
                            <h3 className="text-danger">Bạn chưa có bài tuyển dụng nào</h3> :
                            <select name="post" className="post form-control">
                                {
                                    post.map((item, index) =>
                                        <option value={item.id} key={index}>{item.title}</option>
                                    )
                                }
                            </select>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Đóng
          </Button>
                    <Button variant="success" onClick={handleInvite}>
                        Mời ứng tuyển
          </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Candidate
