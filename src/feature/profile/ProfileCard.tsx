"use client";
import Image from "next/image";
import { useState } from "react";
import { Edit2 } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const ProfileCard = () => {
    const [isEditing, setIsEditing] = useState(false);
    const user = useSelector((state: RootState) => state.auth);

    const [profile, setProfile] = useState({
        name: user?.name,
        lastOrderedAddress: "123 Fashion St, New York, NY",
    });

    const handleChange = (field: string, value: string) => {
        setProfile((prev) => ({ ...prev, [field]: value }));
    };

    console.log(user);
    return (
        <div className="max-w-sm min-w-sm w-full bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="relative h-32 bg-gradient-to-r from-orange-200 to-orange-100">
                <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2">
                    <Image
                        src="https://randomuser.me/api/portraits/women/30.jpg"
                        alt="Profile Picture"
                        width={100}
                        height={100}
                        className="rounded-full border-4 border-white"
                    />
                </div>
            </div>
            <div className="pt-12 pb-6 px-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center capitalize">{profile.name}</h2>

                {isEditing ? (
                    <textarea
                        value={profile.lastOrderedAddress}
                        onChange={(e) => handleChange("lastOrderedAddress", e.target.value)}
                        className="w-full mt-4 p-2 text-sm text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        rows={3}
                    />
                ) : (
                    <p className="text-sm text-gray-700 text-center mt-4">{profile.lastOrderedAddress}</p>
                )}
            </div>
            <div className="px-6 pb-6 flex space-x-2">
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="flex-1 py-2 px-4 bg-primary/60 text-white rounded-md hover:bg-primary focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-300 flex items-center justify-center"
                >
                    <Edit2 size={18} className="mr-2" />
                    {isEditing ? "Save Address" : "Edit Address"}
                </button>
            </div>
        </div>
    );
};

export default ProfileCard;
