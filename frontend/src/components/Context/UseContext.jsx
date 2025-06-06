import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.id; // ✅ Sửa: backend dùng "id", không phải "userId"
            if (!userId) return;

            axios
                .get(`http://localhost:8080/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => setUser(res.data))
                .catch((err) => {
                    console.error("❌ Fetch user failed:", err);
                    setUser(null);
                });
        } catch (err) {
            console.error("❌ Invalid token:", err);
            setUser(null);
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
