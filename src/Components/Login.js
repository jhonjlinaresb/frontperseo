import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {notification} from 'antd';

function Login({setUser}) {
    const history = useHistory();
    const onFinish = users =>{
        console.log('onFinish');
        /* axios.post(process.env.REACT_APP_BASE_URL +'/ws/Login.php',users) */
        axios.post('https://dev.perseo.tv/ws/Login.php', users)
        .then(res=>{
            console.log("res data Login: "+JSON.stringify(res.data));
            setUser(res.data.user) //seteo el user como estado del App.js
            localStorage.setItem('authToken',res.data.token);
            localStorage.setItem('user',JSON.stringify(res.data.user))
            notification.success({message:'Bienvenido',description:'Bienvenido '+users.email})
            setTimeout(() => {
                history.push('/main')
            }, 1000);
        })
        .catch(error=>console.log(error))
        notification.success({message:'Error',description:'Error to Login'})
    }

    return (
        <div className="login">

            <form className="login_form"
            onFinish={onFinish}>
                <h1>Login Here!</h1>

                <input 
                type="email"
                placeholder="User"
                />

                <input 
                type="password" 
                placeholder="Password"
                />
                <button type="submit" className="submit_btn">Login</button>
            </form>
            
        </div>
    )
}

export default Login;
