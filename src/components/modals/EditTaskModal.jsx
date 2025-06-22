import {
  Box,
  Button,
  MenuItem,
  Modal,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import * as React from 'react';
import { toast } from 'react-toastify';
import { updateTask } from '../../services/taskService';

export default function EditTaskModal({ open, handleClose, task, myTasks }) {
  const [formData, setFormData] = React.useState({
    title: task?.title || '',
    description: task?.description || '',
    status: task?.status || 'Todo',
    dueDate: dayjs(),
    image: task?.image || null,
  });
  const [imagePreview, setImagePreview] = React.useState(task?.image || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (newValue) => {
    setFormData((prev) => ({ ...prev, dueDate: newValue }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = async () => {
    const formattedData = {
      ...formData,
      dueDate: dayjs(formData.dueDate).format('D MMMM YYYY'),
    };

    const response = await updateTask(task._id, formattedData);
    if (response.success) {
      toast.success(response.message);
    } else {
      toast.error(response.message);
      console.error("Error updating task:", response.message);
    }

    handleClose();
    setFormData({ title: '', description: '', status: 'Todo', dueDate: dayjs(), image: null });
    setImagePreview(null);
  };

  React.useEffect(() => {
    if (open && task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        status: task.status || 'Todo',
        dueDate: dayjs(task.dueDate),
        image: task.image || null,
      });
      setImagePreview(task.image || null);
    }
    myTasks();
  }, [open]);

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: '80%', md: 500 },
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: { xs: 2, sm: 3, md: 4 },
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2} fontSize={{ xs: '1rem', md: '1.25rem' }}>
          Edit Task
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            size="small"
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />

          <TextField
            select
            label="Status"
            name="status"
            fullWidth
            size="small"
            value={formData.status}
            onChange={handleChange}
          >
            <MenuItem value="Todo">Todo</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
            <MenuItem value="Done">Done</MenuItem>
          </TextField>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={formData.dueDate}
              onChange={handleDateChange}
              format="D MMMM YYYY"
              slotProps={{ textField: { size: 'small', fullWidth: true } }}
            />
          </LocalizationProvider>

          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            alignItems="center"
          >
            <Button fullWidth variant="outlined" component="label">
              Upload Image
              <input type="file" hidden accept="image/*" onChange={handleFileChange} />
            </Button>
            {imagePreview && (
              <Box>
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    height: 60,
                    width: 100,
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}
          </Stack>

          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button onClick={handleClose} color="warning">Cancel</Button>
            <Button onClick={handleFormSubmit} variant="contained">Update Task</Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
