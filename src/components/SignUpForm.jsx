
import { useState } from "react"
import { toast } from "react-toastify"; // Import Toastify
import { useNavigate } from "react-router-dom";

const SignUpForm = ({addNewUser}) => {

   const navigate = useNavigate()

const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    
})

const handleChanges = (e) => {
  const { name, value } = e.target;
  setValues({
    ...values,
    [name]: value // Update the correct field
  });
}

const handleSubmit = async (e) => {
    e.preventDefault()
    
    

 
    const newUser = {
        name: values.name,
        email: values.email,
        password: values.password,
     
    }

    try {
      if(!newUser.name || !newUser.email || !newUser.password){
        toast.error("Fill all entries!" , {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            theme: "colored",
          })
    
        }
      await addNewUser(newUser)
   

    } catch (error) {
      
     
        console.error("Error adding user:", error);

    }
 


     
       return  navigate('/home')



    
    

}


  return (
    <>
    
    <section
    className="bg-slate-900 flex flex-col justify-center items-center w-full h-screen"
  >
    <div className="bg-slate-800 md:w-1/2 xl:w-1/2   rounded-xl border border-gray-500 sm:w-96">
      <div className="p-6    ">
        <h5 className="text-white font-bold md:text-2xl xs:text-xl">Create an account</h5>

        <form onSubmit={handleSubmit}>

        <div className="text-white mt-3">
            <label htmlFor="name" className="block mb-2 sm:text-sm md:text-md"
              >Your name</label
            >
            <input
              type="text"
              placeholder="••••••••"
              name="name"
              id="name"
              value={values.name}
              onChange={handleChanges} 
              className="w-full bg-slate-700 rounded-md md:py-2 pl-2 text-md border border-gray-500 sm:py-1 sm:text-sm"
            />
          </div>

          <div className="text-white mt-3">
            <label htmlFor="email" className="block mb-2 sm:text-sm md:text-md"
              >Email</label
            >
            <input
              type="email"
              name="email"
              placeholder="name@company.com"
              id="email"
              value={values.email}
              onChange={handleChanges} required
              className="w-full bg-slate-700 rounded-md md:py-2 pl-2 text-md border border-gray-500 sm: py-1 text-sm"
            />
          </div>

          <div className="text-white mt-3">
            <label htmlFor="password" className="block mb-2 sm:text-sm md:text-md"
              >Password</label
            >
            <input
              type="text"
              placeholder="••••••••"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChanges} required
              className="w-full bg-slate-700 rounded-md md:py-2 pl-2 text-md border border-gray-500 sm: py-1 text-sm"
            />
          </div>

         

          <div className="flex items-start text-gray-300 mt-3  sm:text-xs">
            <div className="mr-2">
              <input
                type="checkbox"
                name="checkbox"
                id="checkbox"
                className="bg-gray-50 mt-1 sm: w-3 h-3"
              />
            </div>
            <div>
              <label htmlFor="checkbox" className="font-light text-sm  sm:text-xs">
                I accept the
                <a className="font-medium text-primary-600 text-sky-400/50"
                  >Terms and Conditions</a
                ></label
              >
            </div>
          </div>

          <button
            type="submit"
            className="bg-sky-400/50 w-full rounded-md md:py-2 mt-3 text-white font-bold sm:py-1 text-xs xs:py-2"
          >
            Create an account
          </button>

          <p className="text-gray-300 font-light text-sm mt-3">
            Already have an account?
            <a className="font-medium text-sky-400/50" href="./signin.html">Login here</a>
          </p>
        </form>
      </div>
    </div>
  </section>

    </>
  )
}

export default SignUpForm