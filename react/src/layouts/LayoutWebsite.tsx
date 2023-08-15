import { Outlet } from "react-router-dom";
import banner from '../assets/img/banner-header.jpg'
import List from "../components/List";
const LayoutWebsite = () => {
    return (

        <div className='container'>
            <header>
                <div className="logo" >
                    <h2 ><a href="http://localhost:5173/admin" style={{ textDecoration: 'none' }}>Admin</a></h2>
                </div>
                <div className="menu">
                    <nav>
                        <ul>
                            <li><a href="">Home</a></li>
                            <li><a href="">Product</a></li>
                        </ul>

                    </nav>
                </div>
                <div className="actions">
                    <div className='login'  >
                        <a href="/client/signin" ><button>login</button></a>
                    </div>
                    <div className='logup'>
                        <a href="/client/signup"><button>logup</button></a>
                    </div>
                </div>
            </header>
            <div className='banner'>
                <img src={banner} />
            </div>
            <main>
                <Outlet />
            </main>
            <div id="footer">
                <div className="box">
                    <div className="logo" style={{ textAlign: 'center' }}>
                        Ant Design ©2023 Created by Ant UED
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LayoutWebsite;