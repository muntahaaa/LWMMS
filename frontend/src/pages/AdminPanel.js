import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaRegCircleUser } from "react-icons/fa6";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ROLE from "../common/role";

const AdminPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div className="min-h-[calc(100vh-120px)] flex">
      {/*** Sidebar ***/}
      <aside className="bg-white min-h-screen w-full max-w-64 shadow-lg">
        <div className="h-40 flex flex-col justify-center items-center border-b">
          <div className="text-5xl cursor-pointer relative flex justify-center">
            {user?.profilePic ? (
              <img
                src={user?.profilePic}
                className="w-20 h-20 rounded-full border-2 border-gray-300"
                alt={user?.name}
              />
            ) : (
              <FaRegCircleUser className="text-gray-500" />
            )}
          </div>
          <p className="capitalize text-lg font-semibold mt-2">{user?.name}</p>
          <span className="bg-blue-600 text-white px-2 py-1 rounded-full text-xs">
            {user?.role}
          </span>
        </div>

        {/*** Navigation ***/}
        <nav className="grid p-4">
          <Link
            to={"all-users"}
            className="px-4 py-2 hover:bg-gray-100 rounded transition-all"
          >
            All Users
          </Link>
          <Link
            to={"all-products"}
            className="px-4 py-2 hover:bg-gray-100 rounded transition-all"
          >
            All Artifacts
          </Link>
          <Link
            to={"all-events"}
            className="px-4 py-2 hover:bg-gray-100 rounded transition-all"
          >
            All Events
          </Link>
          <Link
            to={"all-tickets"}
            className="px-4 py-2 hover:bg-gray-100 rounded transition-all"
          >
            All Tickets
          </Link>
        </nav>
      </aside>

      {/*** Main Content ***/}
      <main className="w-full h-full p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminPanel;
