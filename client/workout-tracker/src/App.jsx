import { Fragment, useState } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Exercises } from './pages/exercises';
import { Layout } from './components/Layout';
import './App.css'

function App() {

  return (
    <Router>
      <Routes>
        <Route element= {<Layout/>}>
          <Route path='/' element={<h1>Hello</h1>}/>
          <Route path='/exercises' element={<Exercises/>}/>
        </Route>
      </Routes>
    </Router>
    
  );
}

export default App
