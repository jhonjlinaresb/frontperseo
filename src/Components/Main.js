import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { Input, Button} from 'antd';


const { Search } = Input;


function Main () {
    
    const view = params => {
        let token = localStorage.getItem("authToken");
        console.log(token);
        params.preventDefault();
        const get = {
            token: token,
            device: 'Web'
        };
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        console.log(get);
        axios.post('https://dev.perseo.tv/ws/GetView.php',qs.stringify(get), config)
        .then(res => {
          console.log(res.data);
          localStorage.setItem('getView',JSON.stringify(res.data));
        }).catch((error)=>{
          console.log(error);
        })

    };


    return (
        <div>
            <h3>Hello of main</h3>
            <Search placeholder="Realizar búsqueda" enterButton="Search" size="large" loading />
            <form onSubmit={view}>
            <Button  type="submit" htmlType="submit" value="Submit">
                    View
            </Button>
            </form>
        </div>
    )
}

export default Main;
