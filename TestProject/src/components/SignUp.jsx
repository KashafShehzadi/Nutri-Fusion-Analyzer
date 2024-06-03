import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function SignUp() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");

  const navigate = useNavigate();

  // Validate input fields
  const validate = () => {
    const errors = {};

    if (!username) {
      errors.username = "Username is required";
    }

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
    }

    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Submission work
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    Axios.post("http://localhost:3000/auth/signup", {
      username, email, password,
    }).then(response => {
      if (response.data.status) {
        navigate('/login');
      }
    }).catch(err => {
      setServerError("Server not responding ,try again"); // Set server error
      console.log(err);
    });
  };

  return (
    <>
      <div className="bg-slate-900 w-full h-screen flex items-center justify-between">
        {/* Image div */}
        <div className='w-[50%] h-screen hidden lg:block'>
          <img src="/src/assets/images/Medi.png" alt="img" className='w-full rounded h-full' />
        </div>

        {/* Form div */}
        <div className='container border-2 bg-slate-900 border-myCustomColor rounded-md items-center justify-center h-auto lg:w-[50%] w-full mx-10'>
          <h2 className="md:text-3xl text-xl font-bold mb-4 text-center text-myCustomColor">SignUp</h2>
          <form className="flex p-4 flex-col sm:flex-wrap gap-4 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-full">
              <div className="mb-4">
                <label htmlFor="name" className="block text-white font-bold mb-2 text-base">UserName:</label>
                <input
                  type="text"
                  id="name"
                  placeholder="UserName"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="shadow border-myCustomColor border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="block text-white font-bold mb-2 text-base">Email:</label>
                <input
                  type="email"
                  id="email"
                  placeholder="abc123@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow border-myCustomColor border-2 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
              </div>

              <div className="mb-4">
                <label htmlFor="password" className="block text-white font-bold mb-2 text-base">Password</label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow border-myCustomColor border-2 appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
              </div>
              {serverError && <p className="text-red-500 text-xl italic text-center">{serverError}</p>} {/* Display server error */}
              <div className="w-full flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-myCustomColor w-full hover:bg-white text-white hover:text-myCustomColor hover:border-2 hover:border-myCustomColor font-semibold py-2 px-4 rounded-md"
                >
                  Sign Up
                </button>
              </div>

              <div className="w-full text-white lg:flex justify-center mt-4">
                <p>Already have an account?</p><Link to="/login" className="text-blue-400 underline">Login Here</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default SignUp;
