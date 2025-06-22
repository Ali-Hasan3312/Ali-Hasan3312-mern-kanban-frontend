import { useEffect, useRef, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { getTasks, updateTask } from '../../services/taskService';
import AddTaskModal from '../modals/AddTaskModal';
import Card from './Card';
import { useLocation } from 'react-router';


const Tasks = () => {
    const [statusList, setStatusList] = useState(['Todo', 'In Progress', 'Done']);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [draggedItem, setDraggedItem] = useState(null);
  const [sourceList, setSourceList] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [targetList, setTargetList] = useState('');
  const itemRefs = useRef({});
  const [startTouchPosition, setStartTouchPosition] = useState({ x: 0, y: 0 });
  const [addStatus, setAddStatus] = useState('Todo');
  const [open, setOpen] = useState(false);
  const path = useLocation()
  const myTasks = async () => {
    const data = await getTasks();
    if (data.tasks?.length > 0) {
      setTasks(data.tasks);
    }
  };

  useEffect(() => {
    myTasks();
  }, []);

  const handleDragStart = (item, listName) => {
    setDraggedItem(item);
    setSourceList(listName);
    setIsDragging(true);
  };


const handleDrop = async (newStatus) => {
  if (!draggedItem || sourceList === newStatus) return;

  const updatedTask = { ...draggedItem, status: newStatus };

  try {
    await updateTask(draggedItem._id, { status: newStatus }).then((res)=> {
        if(res.success){
            toast.success("Status updated successfully")
            setTasks((prev) =>
              prev.map((task) =>
                task._id === draggedItem._id ? updatedTask : task
              )
            );
        }
    })

  } catch (err) {
    console.error("Failed to update task:", err);
    toast.error(err.response.data.message)
  } finally {
    setDraggedItem(null);
    setSourceList('');
    setIsDragging(false);
    setStartTouchPosition({ x: 0, y: 0 });
  }
};


  const handleTouchStart = (item, listName, e) => {
    const touch = e.touches[0];
    const itemElement = itemRefs.current[item._id];
    if (itemElement) {
      const rect = itemElement.getBoundingClientRect();
      setStartTouchPosition({
        x: touch.clientX - rect.left,
        y: touch.clientY - rect.top,
      });
    }
    handleDragStart(item, listName);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || !draggedItem) return;
    const touch = e.touches[0];
    const draggedElement = itemRefs.current[draggedItem._id];
    if (draggedElement) {
      draggedElement.style.position = 'absolute';
      draggedElement.style.left = `${touch.clientX - startTouchPosition.x}px`;
      draggedElement.style.top = `${touch.clientY - startTouchPosition.y}px`;

      statusList.forEach((list) => {
        const listElement = document.getElementById(list);
        if (listElement) {
          const rect = listElement.getBoundingClientRect();
          if (
            touch.clientX >= rect.left &&
            touch.clientX <= rect.right &&
            touch.clientY >= rect.top &&
            touch.clientY <= rect.bottom
          ) {
            setTargetList(list);
          }
        }
      });
    }
  };

  const handleTouchEnd = () => {
    if (targetList) handleDrop(targetList);
    const draggedElement = itemRefs.current[draggedItem?._id];
    if (draggedElement) {
      draggedElement.style.position = 'static';
    }
    setTargetList('');
  };

  useEffect(() => {
    const handleTouchMoveEvent = (e) => {
      if (isDragging) {
        handleTouchMove(e);
      }
    };
    window.addEventListener('touchmove', handleTouchMoveEvent, { passive: false });
    return () => window.removeEventListener('touchmove', handleTouchMoveEvent);
  }, [isDragging]);

  const handleOpen = (index) => {
    setOpen(true);
    setAddStatus(statusList[index]);
  };
  const handleClose = () => setOpen(false);

  const handleRemoveTasks = (taskId) => {
    setTasks((prev) => prev.filter((task) => task._id !== taskId));
  };

useEffect(() => {
  const params = new URLSearchParams(path.search);
  const taskParam = params.get('task'); 
  const searchParam = params.get('search'); 

  const map = {
    'todo': 'Todo',
    'in-progress': 'In Progress',
    'done': 'Done',
  };
  const selectedStatuses = taskParam ? [map[taskParam]] : ['Todo', 'In Progress', 'Done'];
  setStatusList(selectedStatuses);

  const filtered = tasks.filter((task) => {
    const matchesStatus = selectedStatuses.includes(task.status);
    const matchesSearch = searchParam
      ? task.title.toLowerCase().includes(searchParam.toLowerCase()) ||
        task.description.toLowerCase().includes(searchParam.toLowerCase())
      : true;
    return matchesStatus && matchesSearch;
  });

  setFilteredTasks(filtered);
}, [path.search, tasks]);


  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        { statusList.map((status, index) => (
          <div
            key={status}
            id={status}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(status)}
            onTouchEnd={handleTouchEnd}
            className="w-[20rem]"
          >
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-400">
                {status} ({tasks.filter((task) => task.status === status).length})
              </span>
              <div
                onClick={() => handleOpen(index)}
                className="flex items-center gap-2 cursor-pointer"
              >
                <button className="bg-gray-200 p-[2px] rounded-full">
                  <FiPlus className="text-gray-500 text-sm" />
                </button>
                <span className="font-semibold">Add new task</span>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-4 min-h-[100px] cursor-grab">
              {filteredTasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <div
                    key={task._id}
                    draggable
                    onDragStart={() => handleDragStart(task, status)}
                    onDragEnd={() => {
                      setDraggedItem(null);
                      setStartTouchPosition({ x: 0, y: 0 });
                    }}
                    onTouchStart={(e) => handleTouchStart(task, status, e)}
                    onTouchMove={handleTouchMove}
                    ref={(el) => (itemRefs.current[task._id] = el)}
                  >
                    <Card
                      task={task}
                      handleRemoveTasks={handleRemoveTasks}
                      myTasks={myTasks}
                    />
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      <AddTaskModal
        open={open}
        handleClose={handleClose}
        addStatus={addStatus}
        myTasks={myTasks}
      />
    </>
  );
};

export default Tasks;
