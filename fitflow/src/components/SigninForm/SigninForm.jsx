import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import * as authService from '../services/authService';


const SigninForm = (props) => {
    const navigate = useNavigate();
    const [message, setMeassage] = useState(['']);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const updateMessage = (msg) => {
        setMeassage(msg);
    
    }

    const handleChange = (e) => {
        updateMessage('');
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await authService.signin(formData);
            props.setUser(user);
            navigate('/dashboard');
        }catch (error) {
            updateMessage(error.message)
        }
    };

    return (
        <main>
            <section>
            </section>
            <section>
            <form autoComplete="off" onSubmit={handleSubmit}>
            <h1>Log In</h1>
            <p>{message}</p>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                    type="text"
                    autoComplete="off"
                    id="username"
                    value={formData.username}
                    name="username"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input 
                    type="password"
                    autoComplete="off"
                    id="password"
                    value={formData.password}
                    name="password"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <button>Log In</button>
                    <Link to="/">
                    <button>Cancel</button>
                    </Link>
                </div>
            </form>
            </section>
        </main>
    );
};

export default SigninForm;