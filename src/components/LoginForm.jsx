import { useState } from "react"


const SignupForm = () => {

    

    const [values, setValues] = useState({
      email: '',
      password: '',
      confirmPassword:'',
    })

    const handleChanges = (e) => {
      setValues({...values, [e.target.name]: [e.target.value]})

    }

    const handleSubmit = (e) =>{

      e.preventDefault()
      console.log(values)

    }

    

  return (
    <>
<section
      className="bg-slate-900 flex flex-col justify-center items-center w-full h-screen"
    >
      <div className="bg-slate-800 w-3/5 rounded-xl border border-gray-500 sm:w-96">
        <div className="p-6">
          <h5 className="text-white font-bold text-2xl">Login</h5>

          <form onSubmit={handleSubmit}>
          <div className="text-white mt-3">
            <label htmlFor="email" className="block mb-2 sm:text-sm md:text-md"
              >Your email</label
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
                onChange={(e)=>handleChanges(e)} required
                className="w-full bg-slate-700 rounded-md md:py-2 pl-2 text-md border border-gray-500 sm: py-1 text-sm"
              />
            </div>
            

            <div className="text-white mt-3">
              <label htmlFor="confirmPassword" className="block mb-2 sm:text-sm md:text-md"
                >Confirm password</label
              >
              <input
                type="text"
                placeholder="••••••••"
                name="confirmPassword"
                id="confirmPassword"
            
                value={values.confirmPassword}
                onChange={(e)=>handleChanges(e)} required
                className="w-full bg-slate-700 rounded-md md:py-2 pl-2 text-md border border-gray-500 sm:py-1 sm:text-sm"
              />
            </div>

            <div className="flex items-start text-gray-300 mt-3  sm:text-xs">
              <div className="mr-2">
                <input
                  type="checkbox"
                  name="checkbox"
                  id="checkbox"
                 
                  className=" bg-gray-50 mt-1 sm: w-3 h-3"
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
              className="bg-sky-400/50 w-full rounded-md md:py-2 mt-3 text-white font-bold sm:py-1 text-xs xs:h-3"
            >
              Login
            </button>

            <p className="text-gray-300 font-light text-sm mt-3">
              If you don&apos;t have an account
              <a className="font-medium text-sky-400/50" href="./index.html">Signup here</a>
            </p>
          </form>
        </div>
      </div>
    </section>
    </>
  )
}

export default SignupForm