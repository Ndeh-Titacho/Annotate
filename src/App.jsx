import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import LoginPage from "../pages/LoginPage";
import HomePage from '../pages/HomePage';
import MainLayout from './layouts/MainLayout';

import SignUpForm from './components/SignUpForm';



const App = () => {

  const addUser = async (newUser) => {
    try {
      const response = await fetch('http://localhost:5050/api/users/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser) // Ensure the newUser is a valid JSON object
      });
  
      // Check if the response status is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      // Parse the response data
      const data = await response.json();
      console.log('Success:', data);
    } catch (error) {
      console.error('Error:', error);
    }
    

    return
  };
  
  
  const router = createBrowserRouter(
    createRoutesFromElements( 
    <Route path='/' element={<MainLayout/>}>
    <Route path='/home' element={<HomePage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<SignUpForm addNewUser={addUser} />}/>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App