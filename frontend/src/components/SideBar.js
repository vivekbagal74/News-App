import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaUser, FaHome } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import { FaNewspaper } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";


const SideBar = ({ showSideBar }) => {
  const location = useLocation()
  const navigate = useNavigate()
  const menuItems = [
    { id: 1, title: 'Home', path: '/home' },
    { id: 2, title: 'Posted News', path: '/posted' },
    { id: 3, title: 'Add News', path: '/add' },
    { id: 4, title: 'Profile', path: '/profile' },
    { id: 5, title: 'Logout', path: '/logout' },
  ]
  const logout = () => {
    localStorage.removeItem('user')
    navigate('/')
  }
  return (
    <div className={`min-h-full max-h-full transition-all duration-300 bg-primary h-screen flex flex-col overflow-hidden ${showSideBar ? 'w-48' : 'w-0'}`}>

      <Link to='/home'>
        <h1 className="text-white text-3xl font-bold mt-10 text-center">News App</h1>
      </Link>

      <div className="flex flex-col mt-20 justify-center align-middles">
        {menuItems.map((item) => {
          return item.title !== 'Logout' ? (
            <div className={`pl-10 inline-flex gap-4 py-5 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm
            ${location.pathname.includes(item.path) && 'bg-[#145c2aaf] text-yellow-200 font-bold'}`}>
              {item.title !== 'Logout' &&
                (() => {
                  let icon;
                  switch (item.title) {
                    case 'Home':
                      icon = <FaHome size={22} />;
                      break;
                    case 'Posted News':
                      icon = <FaNewspaper size={22} />;
                      break;
                    case 'Add News':
                      icon = <MdPostAdd size={22} />;
                      break;
                    case 'Profile':
                      icon = <FaUser size={22} />;
                      break;
                    default:
                      icon = null;
                      break;
                  }
                  return icon;
                })()}

              <Link
                to={`${item.path}`}
                key={item.id}>
                {item.title}
              </Link>
            </div>
          ) : (
            <span key={item.id} onClick={logout}
              className="pl-10 py-5 inline-flex gap-4 text-gray-400 hover:bg-gray-50 hover:text-gray-700 text-sm cursor-pointer">
              <IoLogOut size={22} />
              Logout
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default SideBar;