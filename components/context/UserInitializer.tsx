"use client";

import { useContext, useEffect } from "react";
import axios from "axios";
import { UserDataContext } from "@/app/context/UserDataContextProvider";
import toast from "react-hot-toast";

export const UserInitializer = ({ children }: { children: React.ReactNode }) => {
    const userData = useContext(UserDataContext);

    // Fetch user data on mount
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/user");
                if (res.data.success) {
                    userData?.setData(res.data.user);
                    console.log(res.data.user);
                }
            } catch (err) {
                console.error("Failed to fetch user data", err);
            }
        };

        fetchUser();
    }, []);


    return <>{children}</>;
};
