import { useState, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import SignUpForm from './components/SignUpForm/SignUpForm';
import SigninForm from './components/SigninForm/SigninForm';
import Dashboard from './components/Dashboard/dashboard';
import * as authService from './components/services/authService';
import './App.css'


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());

  return (
    <>
    <AuthedUserContext.Provider value={user}>
    {/* <NavBar user={user} handleSignout={handleSignout}/> */}
    <Routes>
      {user ? (
        <>
        <Route path="/dashboard" element={<Dashboard user={user} />}/>
        </>
      ): (
        <Route path="/" element = {<Landing />}/>
      )}

      <Route path='/sign-up' element={<SignUpForm setUser={setUser}/>} />
      <Route path='/signin' element={<SigninForm setUser={setUser}/>}/>

    </Routes>
    </AuthedUserContext.Provider>

    </>
  )
}

export default App
