import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

const SignUpForm = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
    firstName: '',
    lastName: '',
    email: '',
    avatar: '',
  });

  const { username, password, passwordConf, firstName, lastName, email, avatar } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleFileChange = (evt) => {
    const file = evt.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFormData({ ...formData, avatar: file.name }); // Optional: store name for validation
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    const data = new FormData();
    data.append('username', username);
    data.append('password', password);
    data.append('passwordConf', passwordConf);
    data.append('firstName', firstName);
    data.append('lastName', lastName);
    data.append('email', email);
    if (selectedFile) {
      data.append('avatar', selectedFile);
    }

    try {
      const newUser = await authService.signup(data);

      if (newUser) {
        setUser(newUser);
        navigate('/dashboard');
      } else {
        setMessage('Signup failed');
      }
    } catch (err) {
      setMessage(err.message || 'An error occurred');
      console.error(err);
    }
};

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf && firstName && lastName && email && avatar);
  };

  return (
    <main>
      <h1>Sign Up</h1>
      <p>{message}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">UserName:</label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm Password:</label>
          <input
            type='password'
            id='confirm'
            name='passwordConf'
            value={passwordConf}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type='text'
            id='firstName'
            name='firstName'
            value={firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type='text'
            id='lastName'
            name='lastName'
            value={lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="avatar">Upload Avatar:</label>
          <input
            type="file"
            id="avatar"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={isFormInvalid()}>Sign Up</button>
          <button type="button" onClick={() => navigate('/')}>Cancel</button>
        </div>
      </form>
    </main>
  );
};

export default SignUpForm;
