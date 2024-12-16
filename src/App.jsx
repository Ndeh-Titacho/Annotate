import {Route,createBrowserRouter,createRoutesFromElements,RouterProvider} from 'react-router-dom'
import LoginPage from "../pages/LoginPage";
import HomePage from '../pages/HomePage';
import MainLayout from './layouts/MainLayout';
import SignUpPage from '../pages/SignUpPage';
import SignUpForm from './components/SignUpForm';



const App = () => {

  const addUser = async (newUser) =>{
const res = await fetch('http://localhost:5050/api/users/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(newUser)
})
  console.log(newUser)
  }
  
  const router = createBrowserRouter(
    createRoutesFromElements( 
    <Route path='/' element={<MainLayout/>}>
    <Route path='/home' element={<HomePage/>} />
    <Route path='/login' element={<LoginPage/>} />
    <Route path='/signup' element={<SignUpForm  addNewUser={addUser}/>}/>
      </Route>
    )
  )

  return <RouterProvider router={router} />
}

export default App