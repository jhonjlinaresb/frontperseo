import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { Input, Button, Table} from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const { Search } = Input;
const Column = Table;

function Main () {

  const [ series, setSeries ] = useState([]);
    useEffect(() => {

      let token = localStorage.getItem("authToken");
        console.log(token);
        //params.preventDefault();
        const authData = {
            token: token,
            device: 'Web'
        };
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        //console.log(get);
        axios.post('https://dev.perseo.tv/ws/GetView.php',qs.stringify(authData), config)
        .then(res => {
          console.log(res.data);
          setSeries(res.data.contents);
          localStorage.setItem('results',res.data.contents);
        }).catch((error)=>{
          console.log(error);
        })

            }, [])
    
    const view = params => {
        let token = localStorage.getItem("authToken");
        console.log(token);
        params.preventDefault();
        const authData = {
            token: token,
            device: 'Web'
        };
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        //console.log(get);
        axios.post('https://dev.perseo.tv/ws/GetView.php',qs.stringify(authData), config)
        .then(res => {
          console.log(res.data);
          localStorage.setItem('results',res.data.contents);
        }).catch((error)=>{
          console.log(error);
        })

    };

    return (
        <div>
          <header>
          <Link to="/logout">Salir</Link>
          </header>
            <h3>Welcome</h3>
            <Search placeholder="Realizar búsqueda" enterButton="Search" size="large" loading />

            <form onSubmit={view}>
            <Button  type="submit" htmlType="submit" value="Submit">
                    View
            </Button>
            </form>
            {/* <text>{localStorage.getItem('results')}</text> */}
            {/* <Table dataSource={localStorage.getItem('results')} pagination={{pageSize: 6}}> */}
            {/* <column title="Id" dataIndex="id" key='id' /> */}
            {/* <Card
                hoverable
                style={{ width: 800 }} 
              >
              <p>{<p>ID: {localStorage.getItem('results')}</p>} description={localStorage.getItem('results')}</p><hr/>
              </Card> */}
              <Table dataSource={series} pagination={{pageSize: 6}}>
              <Column title="Id" dataIndex="id" key='id' />
              </Table>
        </div>
    )
}

export default Main;
