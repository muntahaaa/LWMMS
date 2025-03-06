import React, { useContext, useState } from "react";
import { useEffect, useRef } from "react";
import Logo from "./Logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { FaBars } from "react-icons/fa6"; // ✅ Menu icon
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const [navMenu, setNavMenu] = useState(false); // ✅ State for the menu
  const menuRef = useRef(null);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setNavMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>

        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow pl-2">
          <input
            type="text"
            placeholder="Search product here..."
            className="w-full outline-none"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white">
            <GrSearch />
          </div>
        </div>

        <div className="flex items-center gap-7">
          <div className="relative flex justify-center">
            {user?.id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
            )}

            {menuDisplay && (
              <div className="absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                </nav>
              </div>
            )}
          </div>

          

          <div>
            {user?.id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Login
              </Link>
            )}
          </div>

          {/** ✅ Standard Menu Bar **/}
          <div className="relative" ref={menuRef}>
            {/** ✅ Menu Button */}
            <button
              onClick={() => setNavMenu((prev) => !prev)}
              className="text-2xl p-3 transition-transform duration-300 transform hover:scale-110 focus:outline-none"
            >
              <FaBars />
            </button>

            {/** ✅ Dropdown Menu with Smooth Animation */}
            {navMenu && (
              <div className="absolute right-0 mt-2 bg-white shadow-lg p-4 rounded-lg w-52 border border-gray-300 animate-slideDown z-50">
                <nav className="flex flex-col gap-2">
                  <Link
                    to="/"
                    className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold transition duration-200 hover:scale-105"
                  >
                    Home
                  </Link>
                  <Link
                    to="/about"
                    className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold transition duration-200 hover:scale-105"
                  >
                    About
                  </Link>
                  <Link
                    to="http://localhost:5173/3D-art-gallery"
                    className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold transition duration-200 hover:scale-105"
                  >
                    Have a tour
                  </Link>
                  <Link
                    to="/events"
                    className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold transition duration-200 hover:scale-105"
                  >
                    Events
                  </Link>
                  <Link
                    to="/my-events"
                    className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold transition duration-200 hover:scale-105"
                  >
                    My Events
                  </Link>
                  <Link
                    to="/tickets"
                    className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold transition duration-200 hover:scale-105"
                  >
                    Tickets
                  </Link>
                  <Link
                    to="/my-tickets"
                    className="flex items-center justify-center hover:bg-gray-100 p-3 rounded-lg text-gray-800 font-semibold transition duration-200 hover:scale-105"
                  >
                    My Tickets
                  </Link>
                  
                </nav>
              </div>
            )}

            {/** ✅ Smooth Dropdown Animation */}
            <style>
              {`
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slideDown {
            animation: slideDown 0.3s ease-in-out;
          }
        `}
            </style>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
