import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom";
import Cookies from 'js-cookie'
import axios from 'axios'
import $ from 'jquery'
import { Modal, Button } from 'react-bootstrap';

function Appoinment() {

    const { postID } = useParams();
    const [contact, setcontact] = useState([]);
    const [choosenContact, setchoosenContact] = useState([]);
    const [date, setdate] = useState(new Date());
    const [address, setaddress] = useState("");
    const [change, setchange] = useState(0);
    const token = Cookies.get('token');

    // Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setShow(true)
    }


    useEffect(() => {
        async function fetchMyAPI() {
            let response = await axios.get(`https://localhost:44353/api/contact/listcontact/${postID}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                })
            setcontact(response.data);
        }
        fetchMyAPI();
        console.log("abc");
    }, [change])


    //Hàm xử lý tạo lịch hẹn
    const handleUpdateContact = async (e) => {
        let rs = await axios.post(`https://localhost:44353/api/contact/update`,{
            address : address,
            time: date,
            listcontact : choosenContact
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        alert("Tạo lịch hẹn thành công");
        setShow(false);
    }

    //Hàm xử lý hủy lịch hẹn
    const handleCancleContact = (e) => {
        let el = e.target;
        var contactID = el.getAttribute("data");
        axios.post(`https://localhost:44353/api/contact/cancel`,{
            contactid: contactID,
            type : ""
        },
        {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(rs => {
            if(rs.data.statusCode === 200){
                alert("Hủy thành công");
            }else{
                alert("Hủy thất bại mời kiểm tra lại!");
            }
            let tmp = change;
            tmp++;
            setchange(tmp);
        })
        .catch(err => console.log(err));
    }

    //Hàm xử lý click checkbox
    const handleClick =  e => {
        let el = e.target;
        let checkboxStatus = $(el).is(":checked");
        let contactID = $(el).attr('data');
        let listContact = choosenContact;
        if (checkboxStatus) {
            listContact.push(contactID);
        }
        else {
            let index = listContact.indexOf(contactID);
            listContact.splice(index, 1);
        }
        setchoosenContact(listContact);
        console.log(choosenContact);
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 pt-4">
                    <h3>Danh sách ứng viên <span><Button variant="success" onClick={handleShow}>Đặt lịch hẹn các ứng viên được chọn</Button></span></h3>
                    <table className="table-fill pt-4 mt-5">
                        <thead>
                            <tr>
                                <th className="text-left"></th>
                                <th className="text-left">Tên</th>
                                <th className="text-left">Số điện thoại</th>
                                <th className="text-left">Email</th>
                                <th className="text-left">Loại</th>
                                <th className="text-left">Kết quả</th>
                                <th className="text-left">Đã có lịch</th>
                                <th className="text-left">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="table-hover">
                            {contact.length !== 0 ?
                                contact.map((item, index) =>
                                    <tr key={index}>
                                        <td className="text-left">
                                            <input type="checkbox" data={item.id} onClick={handleClick} />
                                        </td>
                                        <td className="text-left">{item.user.name}</td>
                                        <td className="text-left">{item.user.phone}</td>
                                        <td className="text-left">{item.user.email}</td>
                                        <td className="text-left">{item.type === 1 ? "Mời ứng tuyển" : "Ứng tuyển"}</td>
                                        <td className="text-left">{item.result}</td>
                                        {
                                            item.contactInfo ? 
                                            <td className="text-left">Đã có lịch hẹn</td>: 
                                            <td className="text-left">Chưa có lịch hẹn</td>
                                        }
                                        <td className="d-flex justify-content-around">
                                            <Link to={{
                                                pathname: `/cvinfo/${item.user.id}`
                                            }} className="btn btn-success">Xem CV</Link>
                                            <button className="btn btn-danger" data={item.id} onClick={handleCancleContact}>
                                                Hủy
                                            </button>
                                        </td>
                                    </tr>
                                ) :
                                <tr>
                                    <td colSpan="8" className="text-center">Không có thông tin</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Điền thông tin lịch hẹn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="form-group">
                    <label for="pwd">Ngày hẹn:</label>
                    <input type="datetime-local" className="form-control" id="time" name="time" onChange={e => setdate(e.target.value)}/>
                </div>
                <div className="form-group">
                    <label for="pwd">Địa điểm:</label>
                    <input type="text" className="form-control" id="address" name="address" value={address} onChange={e => setaddress(e.target.value)} />
                </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Đóng
                    </Button>
                    <Button variant="success" onClick={handleUpdateContact}>
                        Đặt lịch
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Appoinment
