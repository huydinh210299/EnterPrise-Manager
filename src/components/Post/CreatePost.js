import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import axios from "axios";
import { quanhuyen } from '../../common/quanhuyen';
import Cookies from 'js-cookie'

function CreatePost() {
    const [success, setSuccess] = useState(false);
    const [area, setArea] = useState([]);
    const [token, setToken] = useState("");
    useEffect(() => {
        let data = [];
        Object.keys(quanhuyen).forEach(key => {
            data.push(quanhuyen[key]['name']);
        });
        setArea(data);
        const token = Cookies.get('token');
        if(token){
            setToken(token);
        }
    },[])

    const formik = useFormik({
        initialValues: {
            title: '',
            address: 'Mê Linh',
            exactaddress: '',
            position: '',
            gender: '1',
            salary: '',
            amount: '',
            expreience: '1',
            submit_deadline: '',
            reciever: '',
            email_reciever: '',
            phone_reciever: '',
            description: '',
            require: '',
            benefit: '',
            skill: ''
        },
        onSubmit: async values => {
            if(token !== ""){
                const rs = await axios.post('https://localhost:44353/api/post/create',values, {
                    headers: {
                        'Authorization' : `Bearer ${token}`,
                    }
                });
                const data = rs.data;
                if(data.statusCode === 400){
                    alert(data.statusText)
                }
                if(data.statusCode === 200){
                    setSuccess(true);
                    window.scrollTo(0, 0);
                }
            }
            console.log(values)
        },
    });


    return (
        <div className="container">
            <h1 className="text-center mt-3">Tạo bài tuyển dụng mới</h1>
            {
                success? (
                    <div className="success text-success text-center">
                        Tạo mới bài viết thành công
                    </div>
                ) : ""
            }
            <form onSubmit={formik.handleSubmit} style={{
                width: '500px',
                margin: 'auto',
                marginTop: '40px'
            }}>
                <div className="form-group">
                    <label htmlFor="title">Tiêu đề:</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.title}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Khu vực:</label>
                    <select
                        name="address"
                        id="address"
                        className="form-control"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        style={{ display: 'block' }}
                    >
                        {
                            area.map((value) =>
                            <option value={value} label={value}  key={value.toString()}/>
                            )
                        }
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="exactaddress">Địa chỉ:</label>
                    <input
                        id="exactaddress"
                        name="exactaddress"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.exactaddress}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="position">Vị trí:</label>
                    <input
                        name="position"
                        id="position"
                        className="form-control"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        style={{ display: 'block' }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="gender">Giới tính:</label>
                    <select
                        name="gender"
                        id="gender"
                        className="form-control"
                        value={formik.values.gender}
                        onChange={formik.handleChange}
                        style={{ display: 'block' }}
                        defaultChecked={true}
                    >
                        <option value="1" label="Nam" />
                        <option value="0" label="Nữ"/>
                        <option value="2" label="Không yêu cầu"/>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="salary">Mức lương:</label>
                    <input
                        id="salary"
                        name="salary"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.salary}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="amount">Số lượng:</label>
                    <input
                        id="amount"
                        name="amount"
                        type="number"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.amount}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="expreience">Kinh nghiệm:</label>
                    <select
                        name="position"
                        id="position"
                        className="form-control"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        style={{ display: 'block' }}
                    >
                        <option value="0" label="Không yêu cầu kinh nghiệm" />
                        <option value="1" label="Một năm" />
                        <option value="2" label="Hai năm"/>
                        <option value="3" label="Ba năm"/>
                        <option value="4" label="Bốn năm"/>
                        <option value="5" label="Năm năm"/>
                        <option value="6" label="Nhiều hơn 5 năm"/>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="submit_deadline">Thời hạn nộp đơn ứng tuyển:</label>
                    <input
                        id="submit_deadline"
                        name="submit_deadline"
                        type="date"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.submit_deadline}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="reciever">Người tuyển dụng:</label>
                    <input
                        id="reciever"
                        name="reciever"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.reciever}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email_reciever">Email nhà tuyển dụng:</label>
                    <input
                        id="email_reciever"
                        name="email_reciever"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.email_reciever}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone_reciever">Số ĐT nhà ứng tuyển:</label>
                    <input
                        id="phone_reciever"
                        name="phone_reciever"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.phone_reciever}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Mô tả:</label>
                    <input
                        id="description"
                        name="description"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.description}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="require">Yêu cầu:</label>
                    <input
                        id="require"
                        name="require"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.require}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="benefit">Phúc lợi:</label>
                    <input
                        id="benefit"
                        name="benefit"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.benefit}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="skill">Kỹ năng yêu cầu:</label>
                    <input
                        id="skill"
                        name="skill"
                        type="text-area"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.skill}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Tạo bài tuyển dụng mới</button>
            </form>
        </div>
    )
}

export default CreatePost