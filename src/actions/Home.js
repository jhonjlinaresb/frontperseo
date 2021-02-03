import { Footer } from 'antd/lib/layout/layout';
import React from 'react';
import {Link} from 'react-router-dom';
import { Carousel } from 'antd';

const Home = () => {
    return (
        <div>
            <header>
            <Link to="/login">Login</Link>
            </header>

            <Carousel>
                <img alt="fondo" src="https://i.ibb.co/dpr4CRR/image.png" />
            </Carousel>

            <Footer> JHON JAIRO LINARES ©2021 | AIRE NETWORKS - PERSEO TV | ALICANTE-SPAIN</Footer>
        </div>
    )
}

export default Home;
