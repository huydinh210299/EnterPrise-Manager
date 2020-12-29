import React from 'react'
import '../css/button.css'
import { useLocation, useHistory } from 'react-router-dom';
function Home() {
    let localtion = useLocation();
    const history = useHistory();
    const goToCreatePost = (e) => {
        history.push(
            {
                pathname: '/creatpost',
            }
        )
    }

    const gotoFindCandidate = (e) => {
        history.push(
            {
                pathname: '/candidate',
            }
        )
    }
    return (
        <div style={{width:'100%',
        height: 'calc(100vh - 56px)',
        backgroundImage: 'url(https://bizsquare.com.sg/wp-content/uploads/2019/09/company-profile-presentation-tips.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'}}>
            <div className="container d-flex justify-content-center flex-column" style={{
                height: '100%',
                width: '100%'
            }}>
                <div className="d-flex justify-content-center">
                    <button class="custom-btn btn-3" onClick={goToCreatePost}><span>Đăng tin ngay</span></button>
                    <button class="custom-btn btn-3" onClick={gotoFindCandidate}><span>Tìm ứng viên</span></button>
                </div>
            </div>
        </div>
    )
}

export default Home
