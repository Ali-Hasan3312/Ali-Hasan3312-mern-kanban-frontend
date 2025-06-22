import React, { useState } from 'react';
import dayjs from 'dayjs';
import { BsThreeDots } from 'react-icons/bs';
import { TfiMenuAlt } from "react-icons/tfi";
import { Menu, MenuItem } from '@mui/material';
import { deleteTask } from '../../services/taskService';
import { toast } from 'react-toastify';
import EditTaskModal from '../modals/EditTaskModal';
import { BiMessageAltDetail } from "react-icons/bi";
import { ImAttachment } from "react-icons/im";

const Card = ({ task, handleRemoveTasks, myTasks }) => {
    const [modalOpen, setModalOpen] = useState(false);
      const handleOpen = () => {
        setModalOpen(true)    
      };
      const handleClose = () => setModalOpen(false);
  const today = dayjs().startOf('day');
  const dueDate = dayjs(task.dueDate).startOf('day');

  let dateColor = 'text-green-500';
  let bgColor = 'bg-green-100';

  if (dueDate.isBefore(today)) {
    dateColor = 'text-red-500';
    bgColor = 'bg-red-100';
  } else if (dueDate.isSame(today)) {
    dateColor = 'text-orange-500';
    bgColor = 'bg-orange-100';
  }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
   <>
    <div className='h-44 w-80 border border-gray-200 rounded-xl mx-auto p-3 flex flex-col gap-4'>
      <div>
        <div className='flex items-center justify-between'>
          <span className='text-sm font-semibold line-clamp-1'>{task.title}</span>
          <div>
            <button
              onClick={handleMenuOpen}
              className='flex items-center justify-center border-2 border-gray-300 h-5 w-5 rounded-full cursor-pointer'
            >
              <BsThreeDots className='text-gray-600' size={12} />
            </button>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem onClick={() => { handleOpen(task); handleMenuClose(); }}>
                Edit Task
              </MenuItem>
              <MenuItem onClick={async() => { 
                await deleteTask(task._id).then((res)=> {
                    if(res.success){
                        toast.success(res.message);
                        handleRemoveTasks(task._id);
                    }
                })
               }}>
                Delete Task
              </MenuItem>
            </Menu>
          </div>
        </div>
        <span className='text-sm line-clamp-1 text-gray-400'>{task.description}</span>
      </div>

      <div className='flex flex-col gap-2'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-1 text-gray-500'>
            <TfiMenuAlt size={12} />
            <span className='mb-1'>progress</span>
          </div>
          <span className='text-sm font-semibold'>0/10</span>
        </div>
        <div className='h-1 w-full bg-gray-200 rounded-sm'></div>
      </div>

      <div className='flex items-center justify-between'>
        <div className={`flex items-center justify-center ${dateColor} py-2 px-4 ${bgColor} rounded-2xl w-fit`}>
          <span className='text-xs font-semibold'>{task.dueDate}</span>
        </div>
        {task.image ? (<img className='h-6 w-6 rounded-full object-cover' src={task.image} alt="Task file" />) : (
            <div className='flex items-center gap-4 text-gray-500'>
                <div className='flex items-center gap-1'>
                    <BiMessageAltDetail size={18} />
                    <span className='text-sm'>0</span>
                </div>
                <div className='flex items-center gap-1'>
                    <ImAttachment size={14} />
                    <span className='text-sm'>0</span>
                </div>
            </div>
        )}
      </div>
    </div>
    <EditTaskModal task={task} handleClose={handleClose} myTasks={myTasks} open={modalOpen} />
   </>
  );
};

export default Card;
