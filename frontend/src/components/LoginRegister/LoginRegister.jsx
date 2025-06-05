import React, { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function LoginRegister({ setUser }) {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div style={{ maxWidth: "400px", margin: "50px auto" }}>
            <div style={{ marginBottom: "20px" }}>
                <button onClick={() => setIsLogin(true)}>Login</button>
                <button onClick={() => setIsLogin(false)}>Register</button>
            </div>
            {isLogin ? <LoginForm setUser={setUser} /> : <RegisterForm />}
        </div>
    );
}
