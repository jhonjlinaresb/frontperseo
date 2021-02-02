import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {notification} from 'antd';

function Login({setUser}) {
    const history = useHistory();
    const handleSubmit = event => {
        event.preventDefault(); // para evitar refrescar la página
        const user = {
            user: event.target.user.value,
            pass: event.target.pass.value
        };
        console.log(user)
        axios.post('https://dev.perseo.tv/ws/Login', user)
            .then(res => {
                setUser(res.data) //seteo el user como estado del App.js
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data))
                notification.success({ message: 'Welcome', description: user.user })
                setTimeout(() => {
                    history.push('/')
                }, 1000);
            })
            .catch(error => { console.log(error); })
    };

    return (
        <div className="login">

            <form className="login_form"
            onSubmit={handleSubmit} >
                <h1>Login Here!</h1>

                <input 
                name="user"
                placeholder="User"
                />

                <input
                name="pass" 
                type="password" 
                placeholder="Password"
                />
                <button type="submit" value="Submit" className="submit_btn">Login</button>
            </form>
            
        </div>
    )
}

export default Login;
