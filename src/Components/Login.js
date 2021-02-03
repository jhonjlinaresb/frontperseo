import React from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import {notification} from 'antd';

function Login({setUser}) {
    const history = useHistory();
    const handleSubmit = params => {
        params.preventDefault(); // para evitar refrescar la página
        const user = {
            user: params.target.user.value,
            pass: params.target.pass.value
        };
        console.log(user)
        axios.post('https://dev.perseo.tv/ws/Login.php', user)
            .then(res => {
                setUser(res.data) //seteo el user como estado del App.js
                localStorage.setItem('authToken', res.data.token);
                localStorage.setItem('user', JSON.stringify(res.data))
                notification.success({ message: 'Welcome', description: user.user })
                setTimeout(() => {
                    history.push('/main')
                }, 1000);
            })
            .catch(error => { console.log(error); })
            notification.error({ message: 'Error', description: 'Error to Login User, Try Again' })
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
