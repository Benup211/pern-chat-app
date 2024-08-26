import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { AuthState } from "./state/authState";
import { IRedirectAuthUserProps } from "./interface/IRedirectAuthUser";
import { FC } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "lucide-react";
const ProtectedRoute: FC<IRedirectAuthUserProps> = ({ children }) => {
    const { isAuthenticated } = AuthState();
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <>{children}</>;
};
const RedirectAuthUser: FC<IRedirectAuthUserProps> = ({ children }) => {
    const {isAuthenticated} = AuthState();
    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
};
const App = () => {
    const { checkAuth,isCheckingAuth} = AuthState();
    useEffect(() => {
        checkAuth();
    }, [checkAuth]);
    if(isCheckingAuth) return <Loader className='w-6 h-6 animate-spin  mx-auto' />
    return (
        <>
            <div className="p-4 h-screen flex items-center justify-center">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="/signup" element={
                        <RedirectAuthUser>
                            <SignUp />
                        </RedirectAuthUser>
                    } />
                    <Route path="/login" element={
                        <RedirectAuthUser>
                            <Login />
                        </RedirectAuthUser>
                    } />
                </Routes>
                <Toaster />
            </div>
        </>
    );
};

export default App;
