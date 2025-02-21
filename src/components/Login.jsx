import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
    const { googleLogin } = useContext(AuthContext);

    const handleGoogleLogin = () => {
        googleLogin()
            .then(result => {
                const user = result.user;
                const userInfo = {
                    userId: user?.uid,
                    name: user?.displayName,
                    email: user?.email
                }
                axios.post(`${import.meta.env.VITE_URL}/users`, userInfo)
                    .then(res => {
                        console.log("User saved:", res.data);
                    })
            })
            .catch(err => {
                console.error("Login Error:", err);
            });
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-lg">
                <h1 className="text-3xl font-semibold text-center text-blue-600 mb-8">Task Manager Login</h1>

                <p className="text-center text-gray-600 mb-6">Manage your tasks efficiently with ease!</p>

                <button
                    onClick={handleGoogleLogin}
                    className="flex items-center justify-center w-full py-3 px-6 text-lg font-medium text-white bg-blue-500 hover:bg-blue-600 transition rounded-xl shadow-md"
                >
                    <FaGoogle className="mr-3" /> Login with Google
                </button>

                <p className="text-center mt-6 text-sm text-gray-500">
                    By continuing, you agree to our <a href="#" className="text-blue-600 underline">Terms & Conditions</a>
                </p>
            </div>
        </div>
    );
};

export default Login;