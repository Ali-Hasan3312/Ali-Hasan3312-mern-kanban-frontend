import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { FiCalendar } from 'react-icons/fi';
import { IoIosSearch, IoMdNotificationsOutline } from 'react-icons/io';
import { useUser } from '../../contexts/UserContext';
import { toast } from 'react-toastify';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = (props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const user = useUser();
  const currentDate = dayjs().format('D MMMM YYYY');
  const navigate = useNavigate();
  const location = useLocation();

  // Handle outside clicks and Esc key
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest('.user-menu') &&
        !e.target.closest('.search-box') &&
        !e.target.closest('.search-icon')
      ) {
        setIsMenuOpen(false);
        setShowSearch(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
        setShowSearch(false);
      }
    };

    window.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  const handleSearchSubmit = (e) => {
    const params = new URLSearchParams(location.search);
    if (searchText.trim()) {
      params.set('search', e.target.value);
      navigate({ search: params.toString() });
    } else {
      params.delete('search');
    }
  };

  return (
    <>
      {/* Dark overlay when search is active */}
      

      <header className="sticky top-0 z-10 w-full bg-white">
        <div className="flex flex-wrap items-center justify-between px-4 py-3 md:px-6 2xl:px-11 relative">
          {/* Left Section */}
          <div className="flex items-center gap-3 sm:gap-6">
            {/* Sidebar Toggle Button (Mobile Only) */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="block absolute top-6 sm:top-3 rounded border border-stroke bg-white p-2 shadow-sm dark:border-strokedark dark:bg-gray-600 lg:hidden"
            >
              <div className="space-y-1">
                <span className="block h-0.5 w-5 bg-black dark:bg-white"></span>
                <span className="block h-0.5 w-5 bg-black dark:bg-white"></span>
                <span className="block h-0.5 w-5 bg-black dark:bg-white"></span>
              </div>
            </button>

            {/* Greeting */}
            <h1 className="text-sm ml-16 lg:ml-0 font-semibold md:text-lg lg:text-xl">
              Welcome Back, {user.user.fullName} 👋
            </h1>
          </div>

          {/* Right Section */}
          <div className="mt-3 flex flex-wrap ml-[90px] lg:ml-0 items-center gap-4 sm:mt-0 relative z-10">
            {/* Search */}
            <div className="relative">
              {!showSearch ? (
                <div
                  className="cursor-pointer text-gray-500 hover:text-black search-icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSearch(true);
                  }}
                >
                  <IoIosSearch size={20} />
                </div>
              ) : (
                <input
                  type="text"
                  autoFocus
                  value={searchText}
                  onChange={(e) => {
                    setSearchText(e.target.value)
                    handleSearchSubmit(e)
                  }

                  }
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSearchSubmit();
                  }}
                  className="search-box border border-gray-300 rounded-md px-3 py-1 text-sm w-40 outline-none shadow-sm"
                  placeholder="Search tasks..."
                />
              )}
            </div>

            {/* Notification Icon */}
            <div className="relative cursor-pointer text-gray-500 hover:text-black">
              <IoMdNotificationsOutline size={20} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-yellow-500"></span>
            </div>

            {/* Calendar */}
            <div className="flex items-center gap-1 text-gray-500">
              <FiCalendar size={20} />
              <span className="text-sm font-medium sm:text-base">
                {currentDate}
              </span>
            </div>

            {/* Avatar */}
            <div
              onClick={(e) => {
                e.stopPropagation();
                setIsMenuOpen(!isMenuOpen);
              }}
              className="relative h-8 w-8 overflow-hidden rounded-full cursor-pointer user-menu"
            >
              <img
                src={user.user.image}
                alt={user.user.fullName}
                className="h-full w-full object-cover"
              />
            </div>

            {/* User Menu */}
            {isMenuOpen && (
              <div className="absolute right-4 top-16 z-50 w-40 rounded-md bg-white p-4 shadow-lg dark:bg-boxdark">
                <Typography
                  variant="body1"
                  className="cursor-pointer text-gray-800 hover:text-blue-500"
                  onClick={() => {
                    localStorage.clear();
                    toast.success('Logged out successfully');
                    window.location.href = '/login';
                  }}
                >
                  Logout
                </Typography>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
