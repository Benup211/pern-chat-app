import React, { useState } from "react";
import GenderCheckBox from "../components/GenderCheckBox";
import { AuthState } from "../state/authState";
import { Link } from "react-router-dom";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
    const [inputs, setInputs] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: "male",
    });
    const navigate=useNavigate();
    const { isLoading, error, signUpUser } = AuthState();
    const handleCheckBoxChange = (gender: "male" | "female") => {
        setInputs({ ...inputs, gender });
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await signUpUser(
                inputs.username,
                inputs.fullname,
                inputs.password,
                inputs.confirmPassword,
                inputs.gender
            );
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto p-4 sm:p-0">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 backdrop-filter backdrop-blur-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-200">
                    SignUp
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Fullname
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered h-10"
                            placeholder="John Doe"
                            value={inputs.fullname}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    fullname: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                username
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered h-10"
                            placeholder="john211"
                            value={inputs.username}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    username: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Password
                            </span>
                        </label>
                        <input
                            type="password"
                            className="w-full input input-bordered h-10"
                            placeholder="Enter password"
                            value={inputs.password}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    password: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Confirm Password
                            </span>
                        </label>
                        <input
                            type="password"
                            className="w-full input input-bordered h-10"
                            placeholder="Confirm Password"
                            value={inputs.confirmPassword}
                            onChange={(e) =>
                                setInputs({
                                    ...inputs,
                                    confirmPassword: e.target.value,
                                })
                            }
                            required
                        />
                    </div>
                    <div>
                        <GenderCheckBox
                            onCheckBoxChange={handleCheckBoxChange}
                            selectedGender={inputs.gender}
                        />
                    </div>
                    {error && (
                        <p className="text-red-500 font-normal my-2">{error}</p>
                    )}
                    <Link
                        to="/login"
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        Already have an account?
                    </Link>
                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2"
                            type="submit"
                        >
                            {isLoading ? (
                                <Loader className="w-6 h-6 animate-spin  mx-auto" />
                            ) : (
                                "Sign Up"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
