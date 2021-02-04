import React from 'react';
import axios from 'axios';
import qs from 'qs';
import {useHistory} from 'react-router-dom';
import {notification, Form, Input, Card, Button} from 'antd';

//Variables AntDesign
const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

//Función Login que llama al back
function Login({setUser}) {
    const history = useHistory();
    const handleSubmit = params => {
        params.preventDefault(); // para evitar refrescar la página
        const user = {
            user: params.target.user.value,
            pass: params.target.pass.value,
            device: 'Web'
        };
        const config = {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
        };
        console.log(user);
        axios.post('https://dev.perseo.tv/ws/Login.php',qs.stringify(user), config )
            .then(res => {
                setUser(res.data) //seteo el user como estado del App.js
                const token = localStorage.token;
                console.log(JSON.stringify(res.data));
                localStorage.setItem('authToken', res.data.token, token);
               // localStorage.setItem('user', JSON.stringify(res.data))
                notification.success({ message: 'Welcome', description: user.user });
                setTimeout(() => {
                    history.push('/main')
                }, 1000);
            })
            .catch(error => { console.log(error); notification.error({ message: 'Error', description: 'Error to Login User, Try Again' }); })
            
    };

    return (
        <div className="login">
            <Card>
            <form
             onSubmit={handleSubmit}
            {...layout}
            >
                <h1>Login Here!</h1>
                <Form.Item 
                name="user"
                rules={[{ required: true, message: 'Please input your email!' }]}
                >
                <Input name="user" placeholder="User" />
                </Form.Item>

                <Form.Item
                rules={[{ required: true, message: 'Please input your password!' }]}
                name="pass" 
                type="password"
                >
                <Input.Password name="pass" placeholder="Password" />
                </Form.Item>

                <Form.Item {...tailLayout}>
                <Button  type="submit" htmlType="submit" value="Submit">
                    Login
                </Button>

                </Form.Item>
            </form>
            </Card>
        </div>
    )
}

export default Login;
