import React from 'react';
import { Card  } from 'antd';
import qs from 'qs';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {RollbackOutlined} from '@ant-design/icons';

const { Meta } = Card;


const Player = () => {
  
  const [serie, setSerie] = useState([]);
  useEffect(() => {
    let token = localStorage.getItem("authToken");
    let serieId = localStorage.getItem("serieId");
      const authData = {
        token: token,
        device: 'Web',
        id: serieId
    };
    const config = {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
    };
      axios.post('https://dev.perseo.tv/ws/Play.php',qs.stringify(authData), config)
      .then(res=> { 
        console.log("respuestaplay: "+JSON.stringify(res.data));
        localStorage.setItem('serieInfo',res.data)
        setSerie(res.data);
    });
  }, [])

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 13, backgroundColor: '#2E2C3A' }}>
            
            <button style={{ padding: 4, margin: 20, backgroundColor: 'black'}}>
            <Link style={{ color: 'red'}} to="/main">
                <RollbackOutlined />Back
            </Link></button>
            <Card
            hoverable
            style={{ width: 300, maxHeight: 300, textAlign: 'center' }}
            cover={<img alt="image" src={serie?.cover} />}
            />
            <br />
            <Card
            hoverable
            style={{ width: 700, maxHeight: 300, textAlign: 'center' }}>
            <Meta style={{backgroundColor: '#2E2C3A', color: '#ffffff'}} title={<p>Title: {serie?.title}</p>}/>
            <Meta title={<p>Duration: {serie?.duration} Segundos</p>}/>
            <Meta title={<p>Rating: {serie?.rating} </p>}/>
            <Meta title={<p>URL: {serie?.url} </p>}/>
            <Meta title={<p>Votes: {serie?.votes} </p>}/>
            <Meta title={<p>Total Votes: {serie?.totalVotes} </p>}/>
            </Card>
        </div>
    )
}

export default Player;
