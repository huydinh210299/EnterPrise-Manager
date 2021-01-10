import React, { useState, useEffect } from 'react'
import axios from "axios";
import { quanhuyen } from '../../common/quanhuyen';
import Cookies from 'js-cookie';
import { useParams } from "react-router-dom";
import { da } from 'date-fns/locale';
import { getDate, getMonth, getYear } from 'date-fns';
import $ from 'jquery';

function EditPost() {
    const token = Cookies.get('token');
    const { postID } = useParams();

    const [post, setpost] = useState({});
    const [area, setArea] = useState([]);

    useEffect(() => {
        //Lấy area
        let data = [];
        Object.keys(quanhuyen).forEach(key => {
            data.push(quanhuyen[key]['name']);
        });
        setArea(data);

        //Lấy post data
        axios.get(`https://localhost:44353/api/post/${postID}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(response => {
                let postData = response.data;
                postData['submit_Deadline'] = ChangeFormateDate(postData['submit_Deadline']);
                setpost(postData);
                console.log(response.data)
            })
            .catch(err => console.log(err));
    }, [])

    const onValueChange = (e) => {
        let el = e.target;
        let objField = $(el).attr('data-value');
        let value = $(el).val();
        let newPost = {...post};
        newPost[objField] = value;
        setpost(newPost);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = {
            ...post,
            postid : postID
        }
        axios.post(`https://localhost:44353/api/post/edit`,data,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }).then(response => {
                if(response.data.statusCode === 200){
                    alert("Chỉnh sửa bài viết thành công");
                }else{
                    alert("Chỉnh sửa bài viết thất bại!. Mời kiểm tra lại");
                }
            })
            .catch(err => console.log(err));
    }

    const ChangeFormateDate = (oldDate) =>
    {
        let newDate = oldDate.toString().split("T")[0];
       return newDate;
    }

    return (
        <div className="container" style={{width: "700px"}}>
            <form onSubmit={handleSubmit}>
                <div class="form-group">
                    <label for="email">Tiêu đề:</label>
                    <input class="form-control" placeholder="Tiêu đề bài tuyển dụng" value={post.title} data-value="title" onChange={onValueChange}/>
                </div>
                <div className="form-group">
                    <label htmlFor="address">Khu vực:</label>
                    <select
                        name="address"
                        id="address"
                        className="form-control"
                        style={{ display: 'block' }}
                        value={post.address}
                        data-value="address"
                        onChange={onValueChange}
                    >
                        {
                            area.map((value) =>
                                 <option value={value} label={value}  key={value.toString()}/>
                            )
                        }
                    </select>
                </div>

                <div class="form-group">
                    <label for="email">Địa chỉ:</label>
                    <input class="form-control" placeholder="Vị trí" value={post.exactAddress} data-value="exactAddress" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Vị trí:</label>
                    <input class="form-control" placeholder="Vị trí ứng tuyển" value={post.position} data-value="position" onChange={onValueChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="address">Giới tính:</label>
                    <select
                        name="address"
                        id="address"
                        className="form-control"
                        style={{ display: 'block' }}
                        value={post.gender}
                        data-value="gender"
                        onChange={onValueChange}
                    >
                        <option value="1" label="Nam" />
                        <option value="0" label="Nữ"/>
                        <option value="2" label="Không yêu cầu"/>
                    </select>
                </div>

                <div class="form-group">
                    <label for="email">Mức lương:</label>
                    <input class="form-control" placeholder="Mức lương" value={post.salary} data-value="salary" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Số lượng:</label>
                    <input class="form-control" placeholder="Số lượng ứng viên" type="number" value={post.amount} data-value="amount" onChange={onValueChange}/>
                </div>

                <div className="form-group">
                    <label htmlFor="expreience">Kinh nghiệm:</label>
                    <select
                        name="position"
                        id="position"
                        className="form-control"
                        value={post.position}
                        style={{ display: 'block' }}
                        data-value="experience"
                        onChange={onValueChange}
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

                <div class="form-group">
                    <label for="email">Thời hạn nộp đơn ứng tuyển:</label>
                    <input class="form-control" placeholder="Thời hạn nộp đơn ứng tuyển(DD/MM/YYYY)" 
                    value={post.submit_Deadline }
                    onChange={onValueChange}
                    type="date"
                    data-value="submit_Deadline"/>
                </div>

                <div class="form-group">
                    <label for="email">Người tuyển dụng:</label>
                    <input class="form-control" placeholder="Tên người tuyển dụng" value={post.reciever} data-value="reciever" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Email nhà tuyển dụng:</label>
                    <input class="form-control" placeholder="Email người tuyển dụng" value={post.email_Reciever} data-value="email_reciever" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Số ĐT nhà ứng tuyển:</label>
                    <input class="form-control" placeholder="Số điện thoại người tuyển dụng" value={post.phone_Reciever} data-value="phone_reciever" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Mô tả:</label>
                    <input class="form-control" placeholder="Mô tả" value={post.description} data-value="description" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Yêu cầu:</label>
                    <input class="form-control" placeholder="Yêu cầu" value={post.require} data-value="require" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Phúc lợi:</label>
                    <input class="form-control" placeholder="Các phúc lợi khi ứng tuyển" value={post.benefit} data-value="benefit" onChange={onValueChange}/>
                </div>

                <div class="form-group">
                    <label for="email">Kỹ năng yêu cầu:</label>
                    <input class="form-control" placeholder="Các kỹ năng cần có" value={post.skill} data-value="skill" onChange={onValueChange}/>
                </div>
                <button type="submit" class="btn btn-primary">Save</button>
            </form>
        </div>
    )
}

export default EditPost
