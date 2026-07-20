import { Fragment, useEffect, useState } from 'react'
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Exercises } from './pages/exercises';
import { NewWorkout } from './pages/newWorkout';
import { CurrWorkouts } from './pages/currWorkouts';
import { Register } from './pages/register';
import { Login } from './pages/login';
import { Layout } from './components/Layout';
import './App.css'

axios.defaults.withCredentials = true;

function App() {
  const[user, setUser] = useState(null);

  const getUser = async() => {
    try {
      const res = await axios.get("http://localhost:8080/auth/isAuth");
      setUser(res.data);
      
    } catch (err) {
      setUser(null)
      console.error(err.message);
    }
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <Router>
      <Routes>
        <Route element= {<Layout/>}>
          <Route path='/' element={<h1>Hello</h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/exercises' element={<Exercises/>}/>
          <Route path='/new_workout' element={<NewWorkout/>}/>
          <Route path='/current_workouts' element={<CurrWorkouts/>}/>
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App
