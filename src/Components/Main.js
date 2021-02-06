import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { Input, Button, Table } from 'antd';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { EyeOutlined, PoweroffOutlined } from '@ant-design/icons';

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
    const selectOne = ( serie ) => {
      localStorage.setItem('serieId',serie.id);
      
       }

    return (
        <div style={{padding: 10, backgroundColor: '#2E2C3A'}}>
          <header>
          <button style={{ padding: 4, backgroundColor: '#2c2c2c'}}>
          <Link to="/logout">
           <PoweroffOutlined />Logout
          </Link>
          </button>
          </header>
            <h3>Welcome</h3>
            

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
              <Table dataSource={series} pagination={{pageSize: 7}}>
              <Search placeholder="Realizar búsqueda" enterButton="Search" size="short" loading />
              <Column title="Id" dataIndex="id" key='id' />
              <Column title="Title" dataIndex="title" key='title' />
              <Column title="Section" dataIndex="section" key='section' />
              <Column title="Duration" dataIndex="duration" key='duration' />
              {/* <Column title="Cover" dataIndex="cover" key='cover' />
              <Column title="Url" dataIndex="url" key='url' /> */}

              <Column
              title="View"
              key="action"
              render={(id) => (
                  <Link to="/player">
                  <a onClick={() => selectOne(id)}><EyeOutlined /></a>
                  </Link>
                
              )}
            />
              </Table>
        </div>
        
    )
}

export default Main;
