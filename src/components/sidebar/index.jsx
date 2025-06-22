import React, { useEffect, useRef, useState } from 'react';
import { BsBrightnessHigh } from "react-icons/bs";
import { FiPlus } from "react-icons/fi";
import { IoMoonOutline } from "react-icons/io5";
import { NavLink, useLocation } from 'react-router-dom';
import { getTasks } from '../../services/taskService';
import SidebarLinkGroup from './SidebarLinkGroupProps';
const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;  
  const sidebar = useRef(null);
  const trigger = useRef(null);
  const [taskStats, setTaskStats] = useState()
  const storedSidebarExpanded = null
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );
const path = useLocation()
  useEffect(() => {
    const clickHandler = ({ target }) => {
      
      setSidebarOpen(false);
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;        
      setSidebarExpanded(false);
      localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  const fetchStats = async () => {
    await getTasks().then((data) => {
      if (data.tasks && data.tasks.length > 0) {
        const todoCount = data.tasks.filter(task => task.status === 'Todo').length;
        const inProgressCount = data.tasks.filter(task => task.status === 'In Progress').length;
        const doneCount = data.tasks.filter(task => task.status === 'Done').length;
        setTaskStats({ todo: todoCount, inProgress: inProgressCount, done: doneCount });
      }
    })
  }

  useEffect(()=>{
    fetchStats();
  },[])  

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 lg:z-3 h-screen w-72.5 flex flex-col pb-6 justify-between overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 shadow-xl ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
    <div className='flex flex-col'>
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <h2 className="text-2xl text-black font-bold flex items-center gap-4">Projects</h2>

       <button className='flex items-center justify-center bg-gray-200 p-1 rounded-full cursor-pointer'>
        <FiPlus className='text-gray-500 text-lg' />
       </button>
      </div>

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className=" px-4 lg:px-6">
          <div>
            <ul className="flex flex-col gap-1">             
              <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`relative flex items-center gap-2.5 rounded-2xl px-4 py-1 font-semibold text-sm text-gray-400 duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 ${
                          (pathname.includes('analytics')) }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Team
                        
                        <svg
                          className={`absolute right-4 ${!open && 'rotate-[-90deg]'} top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-0'
                          }`}
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                     
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center gap-2.5 rounded-2xl px-4 py-1 font-medium text-bodydark1 duration-300 ease-in-out text-sm hover:bg-gray-200 hover:text-gray-800
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Projects
                        
                        <svg
                          className={`absolute right-4 ${!open && 'rotate-[-90deg]'} top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-0'
                          }`}
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mb-5.5 mt-2 flex flex-col gap-2.5 pl-6 text-sm">
                        <li>
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="#"
                              className={`group relative flex items-center gap-2.5 text-gray-400 hover:text-gray-800 rounded-2xl font-medium text-bodydark1 duration-300 ease-in-out 
                        `}
                              
                            >
                           <div className='px-4 py-1 rounded-2xl hover:bg-gray-200'>
                              All Projects (3)
                               </div>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="#"
                              className={`group relative flex items-center gap-2.5 rounded-2xl font-medium text-bodydark1 duration-300 ease-in-out
                        `}
                            >
                              <div className='px-4 py-1 rounded-2xl bg-gray-200'>
                                Design System
                              </div>
                            </NavLink>
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="#"
                              className={`group relative flex items-center gap-2.5 text-gray-400 hover:text-gray-800 rounded-2xl py-1 font-medium text-bodydark1 duration-300 ease-in-out 
                        `}
                              
                            >
                              <div className='px-4 py-1 rounded-2xl hover:bg-gray-200'>
                              User flow
                              </div>
                            </NavLink>
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="#"
                              className={`group relative flex items-center gap-2.5 text-gray-400 hover:text-gray-800 rounded-2xl font-medium text-bodydark1 duration-300 ease-in-out
                        `}
                              
                            >
                              <div className='px-4 py-1 rounded-2xl hover:bg-gray-200'>
                              Ux research
                              </div>
                            </NavLink>
                          </li>
                          
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
              <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`group relative flex items-center rounded-2xl px-4 py-1 font-medium text-sm duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Tasks
                        
                        <svg
                          className={`absolute right-4 ${!open && 'rotate-[-90deg]'} top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-0'
                          }`}
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                      <div
                        className={`translate transform overflow-hidden ${
                          !open && 'hidden'
                        }`}
                      >
                        <ul className="mb-5.5 mt-2 flex flex-col gap-2 text-sm pl-6">
                       
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="#"
                              className={`group relative flex items-center gap-2.5 text-gray-400 hover:text-gray-800 rounded-2xl font-medium text-bodydark1 duration-300 ease-in-out 
                        `}
                              
                            >
                           <div className={`px-4 py-1 rounded-2xl hover:bg-gray-200 ${!path.search? 'bg-gray-200 text-gray-800' : ''}`}>
                              All tasks ({taskStats ? taskStats.todo + taskStats.inProgress + taskStats.done : 0})
                               </div>
                            </NavLink>
                          
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="/dashboard?task=todo"
                              className={`group relative flex items-center gap-2.5 rounded-2xl font-medium text-gray-400 hover:text-gray-800 duration-300 ease-in-out
                        `}
                            >
                              <div className={`px-4 py-1 rounded-2xl hover:bg-gray-200 ${path.search=='?task=todo'? 'bg-gray-200 text-gray-800' : ''}`}>
                               Todo ({taskStats ? taskStats.todo : 0})
                              </div>
                            </NavLink>
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="/dashboard?task=in-progress"
                              className={`group relative flex items-center gap-2.5 text-gray-400 rounded-2xl font-medium text-bodydark1 duration-300 ease-in-out 
                        `}
                              
                            >
                              <div className={`px-4 py-1 rounded-2xl ${path.search=='?task=in-progress'? 'bg-gray-200 text-gray-800' : ''}`}>
                              In progress ({taskStats ? taskStats.inProgress : 0})
                              </div>
                            </NavLink>
                            <NavLink
                             onClick={() => setSidebarOpen(!sidebarOpen)}
                              to="/dashboard?task=done"
                              className={`group relative flex items-center gap-2.5 text-gray-400 hover:text-gray-800 rounded-2xl font-medium text-bodydark1 duration-300 ease-in-out
                        `}
                              
                            >
                              <div className={`px-4 py-1 rounded-2xl hover:bg-gray-200 ${path.search=='?task=done'? 'bg-gray-200 text-gray-800' : ''}`}>
                              Done ({taskStats ? taskStats.done : 0})
                              </div>
                            </NavLink>
                          
                          
                        </ul>
                      </div>
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
               <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`relative flex items-center gap-2.5 rounded-2xl px-4 py-1 font-semibold text-sm text-gray-400  duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 ${
                          (pathname.includes('analytics')) }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Reminders
                        
                        <svg
                          className={`absolute right-4 ${!open && 'rotate-[-90deg]'} top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-0'
                          }`}
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                     
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
               <SidebarLinkGroup
                activeCondition={pathname === '/ui' || pathname.includes('ui')}
              >
                {(handleClick, open) => {
                  return (
                    <React.Fragment>
                      <NavLink
                        to="#"
                        className={`relative flex items-center gap-2.5 rounded-2xl px-4 py-1 font-semibold text-sm text-gray-400  duration-300 ease-in-out hover:bg-gray-200 hover:text-gray-800 ${
                          (pathname.includes('analytics')) }`}
                        onClick={(e) => {
                          e.preventDefault();
                          sidebarExpanded
                            ? handleClick()
                            : setSidebarExpanded(true);
                        }}
                      >
                        Messengers
                        
                        <svg
                          className={`absolute right-4 ${!open && 'rotate-[-90deg]'} top-1/2 -translate-y-1/2 fill-current ${
                            open && 'rotate-0'
                          }`}
                          width="15"
                          height="15"
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M4.41107 6.9107C4.73651 6.58527 5.26414 6.58527 5.58958 6.9107L10.0003 11.3214L14.4111 6.91071C14.7365 6.58527 15.2641 6.58527 15.5896 6.91071C15.915 7.23614 15.915 7.76378 15.5896 8.08922L10.5896 13.0892C10.2641 13.4147 9.73651 13.4147 9.41107 13.0892L4.41107 8.08922C4.08563 7.76378 4.08563 7.23614 4.41107 6.9107Z"
                            fill=""
                          />
                        </svg>
                      </NavLink>
                     
                    </React.Fragment>
                  );
                }}
              </SidebarLinkGroup>
            </ul>
           
          </div>
        </nav>
      </div>
    </div>
     <div className=' flex items-center font-semibold h-8 bg-gray-200 rounded-2xl w-[70%] mx-auto'>
             <div className='flex items-center justify-center gap-1 bg-white ml-1 h-6 w-[103px] shadow-md rounded-2xl'>
              <BsBrightnessHigh />
              <span>Light</span>
             </div>
             
              <div className='flex items-center justify-center gap-1 rounded-2xl ml-4'>
              <IoMoonOutline />
              <span>Dark</span>
              </div>
             
            </div>
    </aside>
  );
};

export default Sidebar;
