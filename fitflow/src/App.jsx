import { useState, createContext } from 'react'
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar'
import SignUpForm from './components/SignUpForm/SignUpForm';
import SigninForm from './components/SigninForm/SigninForm';
import Dashboard from './components/Dashboard/dashboard';
import Calorietrackerform from './components/CalorieTracker/calorietrackerform';
import Habittrackerform from './components/HabitTracker/habittrackerform';
import Goalform from './components/goals/goalform';
import * as authService from './components/services/authService';
import './App.css'


export const AuthedUserContext = createContext(null);

const App = () => {
  const [user, setUser] = useState(authService.getUser());
  

  const handleSignout = () => {
    authService.signout()
    setUser(null)
  }


  return (
    <>
    <AuthedUserContext.Provider value={user}>
    <NavBar user={user} handleSignout={handleSignout} />
    <Routes>
      {user ? (
        <>
        <Route path="/dashboard" element={<Dashboard user={user} />}/>
        <Route path="/calorietrackerform" element={<Calorietrackerform user ={user}/>}/>
        <Route path="/habittrackerform" element={<Habittrackerform user = {user}/>}/>
        <Route path="/goalform" element={<Goalform user={user}/>}/>
        </>
      ): (
        <Route path="/"/>
      )}

      <Route path='/signup' element={<SignUpForm setUser={setUser}/>} />
      <Route path='/signin' element={<SigninForm setUser={setUser}/>}/>

    </Routes>
    </AuthedUserContext.Provider>

    </>
  )
}

export default App
