"use client"

import { UserDataContext } from '@/app/context/UserDataContextProvider'
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

const SmallProfileCard = () => {
    const userData = useContext(UserDataContext);
    const router = useRouter();

    const handleNavigate = () => {
        router.push("/profile");
    }

    return (
        <div className="w-full h-auto bg-white flex flex-col items-center justify-start gap-4 cursor-pointer"
            onClick={handleNavigate}
        >
            <div className="w-full h-auto flex flex-col items-center justify-center">
                {/* Banner and Profile Picture */}
                <div className="w-full h-auto relative">
                    <div className="w-full h-20 bg-slate-300 rounded-t-md">
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
                            className="w-25 h-25 object-cover rounded-full border"
                        />
                    </div>
                </div>

                {/* Name and Bio */}
                <div className="w-full flex items-center justify-between mt-18 m-8 px-[4%]">
                    <div className="w-full h-auto flex flex-col items-start justify-center">
                        <h1 className="text-xl font-bold text-gray-800">
                            {userData?.data.name}
                        </h1>
                        <p className="text-gray-600 mt-2">{userData?.data.bio}</p>
                        <p className="text-gray-600">{userData?.data.email}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SmallProfileCard