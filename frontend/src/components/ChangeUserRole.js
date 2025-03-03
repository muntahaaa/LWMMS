import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const ChangeUserRole = ({ name, email, role, userId, onClose, callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchResponse = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        role: userRole,
      }),
    });

    const responseData = await fetchResponse.json();

    if (responseData.success) {
      toast.success(responseData.message);
      onClose();
      callFunc();
    }

    console.log("Role updated", responseData);
  };

  return (
    <div className="fixed inset-0 w-full h-full flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white shadow-lg p-6 w-full max-w-md rounded-lg relative">
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600 transition-all"
          onClick={onClose}
        >
          <IoMdClose size={22} />
        </button>

        <h1 className="pb-4 text-xl font-semibold text-center text-gray-800">
          Change User Role
        </h1>

        <div className="mb-4">
          <p className="text-gray-700 font-medium">Name:</p>
          <p className="text-gray-900">{name}</p>
        </div>

        <div className="mb-4">
          <p className="text-gray-700 font-medium">Email:</p>
          <p className="text-gray-900">{email}</p>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-700 font-medium">Role:</p>
          <select
            className="border px-4 py-2 rounded-md focus:ring focus:ring-red-300"
            value={userRole}
            onChange={handleOnChangeSelect}
          >
            {Object.values(ROLE).map((el) => (
              <option value={el} key={el}>
                {el}
              </option>
            ))}
          </select>
        </div>

        <button
          className="w-full py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-all font-medium"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;
