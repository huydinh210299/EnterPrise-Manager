import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik';
import axios from "axios";
import { quanhuyen } from '../../common/quanhuyen';


function Signin() {
    const [area, setArea] = useState([]);
    const [success, setSuccess] = useState(false);
    useEffect(() => {
        let data = [];
        Object.keys(quanhuyen).forEach(key => {
            data.push(quanhuyen[key]['name']);
        });
        setArea(data);
    },[])

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            name: '',
            email: '',
            phone: '',
            gender: 'male',
            skype: '',
            position: 'Nhân viên',
            company_name: '',
            tax_code: '',
            area: 'Mê Linh',
            company_phone: '',
            company_email: '',
            website: '',
            scale: '1-9',
        },
        onSubmit: async values => {
            const rs = await axios.post('https://localhost:44353/api/ent/register',values);
            const data = rs.data;
            if(data.statusCode === 400){
                alert(data.statusText)
            }
            if(data.statusCode === 200){
                setSuccess(true);
            }
        },
    });

    return (
        <div className="container">
            <div className="mt-4 text-center" style={{fontSize : '150%'}}>Sign up</div>
            {
                success? (
                    <div className="success text-success text-center">
                        Đăng ký thành công. mời bạn quay lại <Link to="/">trang đăng nhập</Link>
                    </div>
                ) : ""
            }
            <form onSubmit={formik.handleSubmit} style={{
                width: '500px',
                margin: 'auto',
                marginTop: '40px'
            }}>
                <div className="form-group">
                    <label htmlFor="email">Username:</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.username}
                        required
                    />
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
                        required
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="name">Tên:</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        required
                    />
                    
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="phone">Số ĐT:</label>
                    <input
                        id="phone"
                        name="phone"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        required
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
                        <option value="male" label="Nam" />
                        <option value="female" label="Nữ"/>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="skype">Skype:</label>
                    <input
                        id="skype"
                        name="skype"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.skype}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="position">Vị trí trong công ty:</label>
                    <select
                        name="position"
                        id="position"
                        className="form-control"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        style={{ display: 'block' }}
                        defaultChecked={true}
                    >
                        <option value="Nhân viên" label="Nhân viên" />
                        <option value="Trưởng nhóm" label="Trưởng nhóm"/>
                        <option value="Phó Phòng" label="Phó Phòng"/>
                        <option value="Trưởng phòng" label="Trưởng phòng"/>
                        <option value="Phó giám đốc" label="Phó giám đốc"/>
                        <option value="Giám đốc" label="Giám đốc"/>
                        <option value="Tổng giám đốc" label="Tổng giám đốc"/>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="company_name">Tên công ty:</label>
                    <input
                        id="company_name"
                        name="company_name"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.company_name}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="tax_code">Mã số thuế:</label>
                    <input
                        id="tax_code"
                        name="tax_code"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.tax_code}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company_phone">Số ĐT công ty:</label>
                    <input
                        id="company_phone"
                        name="company_phone"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.company_phone}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="company_email">Email công ty:</label>
                    <input
                        id="company_email"
                        name="company_email"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.company_email}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="area">Khu vực:</label>
                    <select
                        name="area"
                        id="area"
                        className="form-control"
                        value={formik.values.area}
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
                    <label htmlFor="website">Website:</label>
                    <input
                        id="website"
                        name="website"
                        type="text"
                        className="form-control"
                        onChange={formik.handleChange}
                        value={formik.values.website}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="scale">Quy mô:</label>
                    <select
                        name="scale"
                        id="scale"
                        className="form-control"
                        value={formik.values.scale}
                        onChange={formik.handleChange}
                        style={{ display: 'block' }}
                        defaultChecked={true}
                    >
                        <option value="1-9" label="1-9 nhân viên" />
                        <option value="10-50" label="10-50 nhân viên"/>
                        <option value="50-100" label="50-100 nhân viên"/>
                        <option value="100-300" label="100-300 nhân viên"/>
                        <option value="300-500" label="500-500 nhân viên"/>
                        <option value=">500" label="Trên 500 nhân viên"/>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Signin
