import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Forget() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState(""); // State to store error message
  const navigate = useNavigate();

  // Validate input fields
  const validate = () => {
    const errors = {};

    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email address is invalid";
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

    Axios.post("http://localhost:3000/auth/forgot", {
      email,
    }).then(response => {
      if (response.data.status) {
        alert("Check your Email for further instructions");
        navigate('/login');
      } else {
        // Display error message to the user
        setErrorMessage(response.data.message);
      }
    }).catch(err => {
      // Display error message to the user
      setErrorMessage("An error occurred while processing your request. Please try again later.");
      console.log(err);
    });
  };

  return (
    <>
      <div className="bg-slate-900 w-full h-screen flex items-center justify-center">
        <div className='container border-2 bg-slate-900 border-myCustomColor rounded-md items-center justify-center h-auto lg:w-[50%] w-full mx-10'>
          <h2 className="md:text-3xl text-xl font-bold mb-4 text-center text-myCustomColor">Forget Password</h2>
          <form className="flex p-4 flex-col sm:flex-wrap gap-4 w-full" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4 w-full">
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

              <div className="w-full flex justify-center mt-4">
                <button
                  type="submit"
                  className="bg-myCustomColor w-full hover:bg-white text-white hover:text-myCustomColor hover:border-2 hover:border-myCustomColor font-semibold py-2 px-4 rounded-md"
                >
                  Send Reset Link
                </button>
              </div>
              {/* Render error message if present */}
              {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Forget;
