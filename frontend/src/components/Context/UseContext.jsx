import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 🆕

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            setIsLoading(false); // 🆕 Không có token => xong luôn
            return;
        }

        try {
            const decoded = jwtDecode(token);
            const userId = decoded.id;
            if (!userId) {
                setIsLoading(false); // 🆕 Token lỗi
                return;
            }

            axios
                .get(`https://8zns8f-8080.csb.app/user/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => {
                    setUser(res.data);
                    setIsLoading(false); // 🆕 Thành công
                })
                .catch((err) => {
                    console.error("❌ Fetch user failed:", err);
                    setUser(null);
                    setIsLoading(false); // 🆕 Lỗi
                });
        } catch (err) {
            console.error("❌ Invalid token:", err);
            setUser(null);
            setIsLoading(false); // 🆕 Token decode lỗi
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, isLoading }}>
            {children}
        </UserContext.Provider>
    );
};
