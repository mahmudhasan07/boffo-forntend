"use client";
import { logout } from "@/redux/slice/authSlice";
import { RootState } from "@/redux/store";
import { LogOut, Save, User, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Profile = () => {
  const route = useRouter();
  const user = useSelector((state: RootState) => state.auth);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error messages when user starts typing again
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to update the profile
    setSuccessMessage("Profile updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    route.push("/");
    // Clears the auth state
  };

  return (
    <div className="">
      <div className="">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          My Profile
        </h1>

        <div className="bg-white rounded-lg shadow-lg">
          <div className="md:flex items-start justify-center">
            {/* Profile Image Section */}
            <div className=" bg-gray-100 p-8 flex flex-col items-center justify-center border-r border-gray-200">
              <div className="w-48 h-48 bg-gray-300 rounded-full flex items-center justify-center mb-4 overflow-hidden">
                <UserCircle size={120} className="text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 text-center mt-2">
                Profile picture placeholder
                <br />
                (Upload functionality coming soon)
              </p>
            </div>

            {/* Profile Details Section */}
            <div className="p-8">
              {successMessage && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
                  {successMessage}
                </div>
              )}

              <form onSubmit={handleProfileUpdate} className="">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <User size={20} className="mr-2" />
                  Personal Information
                </h2>

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none md:min-w-[300px] min-w-[250px] lg:min-w-[500px]  focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none md:min-w-[300px] min-w-[250px] lg:min-w-[500px]  focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-start gap-4 md:text-base text-sm">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2  bg-primary/90 text-white rounded-md hover:bg-primary focus:outline-none  focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <Save size={18} className="mr-2" />
                    Save Changes
                  </button>
                  <button
                    onClick={handleLogout}
                    type="button"
                    className="inline-flex items-center px-4 py-2 bg-primary/90 text-white rounded-md hover:bg-primary focus:outline-none  focus:ring-2 focus:ring-blue-500 transition-colors"
                  >
                    <LogOut size={18} className="mr-2" />
                    Log Out
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
