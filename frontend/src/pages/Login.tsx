import { Link } from "react-router-dom";
import { useState } from "react";
import { Loader } from "lucide-react";
import { AuthState } from "../state/authState";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { IErrorResponse } from "../interface/IErrorResponse";
const Login = () => {
    const { isLoading, loginUser } = AuthState();
    const navigate=useNavigate();
    const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await loginUser(username, password);
            navigate('/');
        } catch (error) {
            toast.error((error as IErrorResponse)?.errorMessage);
        }
    };
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex flex-col items-center justify-center min-w-96 mx-auto p-4 sm:p-0">
            <div className="w-full p-6 rounded-lg shadow-md bg-gray-800 backdrop-filter backdrop-blur-lg">
                <h1 className="text-3xl font-semibold text-center text-gray-200">
                    Login
                    <span className="text-blue-500"> ChatApp</span>
                </h1>
                <form onSubmit={handleLoginSubmit}>
                    <div>
                        <label className="label">
                            <span className="text-base label-text">
                                Username
                            </span>
                        </label>
                        <input
                            type="text"
                            className="w-full input input-bordered h-10"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value);
                            }}
                            disabled={isLoading}
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
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                            disabled={isLoading}
                        />
                    </div>
                    <Link
                        to="/signup"
                        className="text-sm hover:underline hover:text-blue-600 mt-2 inline-block"
                    >
                        {" "}
                        Don't have an account?
                    </Link>
                    <div>
                        <button
                            className="btn btn-block btn-sm mt-2"
                            type="submit"
                        >
                            {isLoading ? (
                                <Loader className="w-6 h-6 animate-spin  mx-auto" />
                            ) : (
                                "Login"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
