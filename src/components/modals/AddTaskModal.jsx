import * as React from 'react';
import {
  Box,
  Button,
  Typography,
  Modal,
  TextField,
  Stack
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { createTask } from '../../services/taskService';
import { toast } from 'react-toastify';

export default function AddTaskModal({ open, handleClose, addStatus, myTasks }) {
  const [formData, setFormData] = React.useState({
    title: '',
    description: '',
    status: addStatus,
    dueDate: dayjs(),
    image: null,
  });
  const [imagePreview, setImagePreview] = React.useState(null);

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
      status: addStatus,
    };

    await createTask(formattedData).then((response) => {
      if (response.success) {
        toast.success("Task created successfully!");
        console.log("Task created successfully:", response);
      } else {
        console.error("Error creating task:", response.message);
      }
    });

    handleClose();
    setFormData({ title: '', description: '', status: 'Todo', dueDate: dayjs(), image: null });
    setImagePreview(null);
  };

  React.useEffect(() => {
    myTasks();
  }, [handleClose]);

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
          Add New Task
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            fullWidth
            size="small"
            required
            value={formData.title}
            onChange={handleChange}
          />

          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={3}
            required
            value={formData.description}
            onChange={handleChange}
          />

          <TextField
            label="Status"
            value={addStatus}
            disabled
            fullWidth
            size="small"
          />

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
            alignItems="center"
            spacing={2}
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
                    maxHeight: 100,
                    objectFit: 'cover',
                    borderRadius: 8,
                  }}
                />
              </Box>
            )}
          </Stack>

          <Box display="flex" justifyContent="flex-end" gap={1} mt={2}>
            <Button onClick={handleClose} color="warning">Cancel</Button>
            <Button onClick={handleFormSubmit} variant="contained">Add Task</Button>
          </Box>
        </Stack>
      </Box>
    </Modal>
  );
}
