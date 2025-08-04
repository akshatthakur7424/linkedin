"use client";

import { UserDataContext } from "@/app/context/UserDataContextProvider";
import { useContext, useEffect, useState } from "react";
import { ManageProfile } from "./components/ManageProfile";
import axios from "axios";
import toast from "react-hot-toast";

export default function Profile() {
    const userData = useContext(UserDataContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (userData?.data?.name || userData?.data?.email) {
            setIsLoading(false);
        }
    }, [userData]);

    const handleSave = async (updatedData: { name: string; bio: string; image: string }) => {
        try {
            const response = await axios.put("/api/user/update", updatedData);
            if (response.status === 200) {
                userData?.setData((prev) => ({
                    ...prev,
                    ...updatedData,
                }));
                toast.success("Profile updated");
            }
        } catch (error) {
            toast.error("Failed to update profile");
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <p className="text-gray-600 text-lg animate-pulse">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-auto grid grid-cols-12 grid-rows-1 p-4">
                <div className="h-full col-span-2"></div>

                <div className="w-full h-auto col-span-6 bg-white flex flex-col items-center justify-start gap-4">
                    <div className="w-full h-auto flex flex-col items-center justify-center">
                        {/* Banner and Profile Picture */}
                        <div className="w-full h-auto relative">
                            <div className="w-full h-60 bg-slate-300 rounded-t-md">
                                <img
                                    src="/images/banner.jpg"
                                    alt="Banner"
                                    className="w-full h-32 object-cover rounded-t-md"
                                />
                            </div>
                            <div className="absolute top-[55%] left-[4%] rounded-full border cursor-pointer">
                                <img
                                    src={userData?.data.image || "/images/profile.jpg"}
                                    alt="Profile"
                                    className="w-40 h-40 object-cover rounded-full border"
                                />
                            </div>
                        </div>

                        {/* Name and Bio */}
                        <div className="w-full flex items-center justify-between mt-18 m-8 px-[4%]">
                            <div className="w-full h-auto flex flex-col items-start justify-center">
                                <h1 className="text-2xl font-bold text-gray-800">
                                    {userData?.data.name}
                                </h1>
                                <p className="text-gray-600 mt-2">{userData?.data.bio}</p>
                                <p className="text-gray-600 mt-2">{userData?.data.email}</p>
                            </div>

                            {/* Edit Button */}
                            <div className="h-full flex flex-col items-center justify-start">
                                <ManageProfile
                                    initialName={userData?.data.name || ""}
                                    initialBio={userData?.data.bio || ""}
                                    profileImage={userData?.data.image || ""}
                                    onSave={handleSave}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="h-full col-span-4"></div>
            </div>
        </div>
    );
}
