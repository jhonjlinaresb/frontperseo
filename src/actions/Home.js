import React from 'react';
import {Link} from 'react-router-dom';
import { Carousel } from 'antd';

const Home = () => {
    return (
        <div>
            <header style={{textAlign: 'center'}} >
            <Link style={{color: 'green'}} to="/login">Login</Link>
            </header>

            <Carousel>
                <img alt="fondo" src="https://i.ibb.co/dpr4CRR/image.png" />
            </Carousel>

            <footer style={{color: 'white', textAlign: 'center'}}> JHON JAIRO LINARES ©2021 | AIRE NETWORKS - PERSEO TV | ALICANTE-SPAIN</footer>
        </div>
    )
}

export default Home;
