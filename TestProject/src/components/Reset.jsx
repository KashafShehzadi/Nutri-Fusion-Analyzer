import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Reset() {
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [errorMessage, setErrorMessage] = useState(""); // State to store error message
    const { token } = useParams();
    const navigate = useNavigate();

    // Validate input fields
    const validate = () => {
        const errors = {};

        if (!password) {
            errors.password = "Password is required";
        } else if (password.length < 6) {
            errors.password = "Password must be at least 6 characters long";
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

        Axios.post(`http://localhost:3000/auth/resetPassword/${token}`, {
            password,
        }).then(response => {
            if (response.data.status) {
                navigate('/login');
            }
        }).catch(err => {
            setErrorMessage("An error occurred while resetting your password. Please try again later.");
            console.log(err);
        });
    };

    return (
        <>
            <div className="bg-slate-900 w-full h-screen flex items-center justify-center">
                <div className='container border-2 bg-slate-900 border-myCustomColor rounded-md items-center justify-center h-auto lg:w-[50%] w-full mx-10'>
                    <h2 className="md:text-3xl text-xl font-bold mb-4 text-center text-myCustomColor">Reset Password</h2>
                    <form className="flex p-4 flex-col sm:flex-wrap gap-4 w-full" onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-4 w-full">
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

                            <div className="w-full flex justify-center mt-4">
                                <button
                                    type="submit"
                                    className="bg-myCustomColor w-full hover:bg-white text-white hover:text-myCustomColor hover:border-2 hover:border-myCustomColor font-semibold py-2 px-4 rounded-md"
                                >
                                    Reset Password
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

export default Reset;
