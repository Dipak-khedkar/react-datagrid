import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Student,
  studentsData,
  deleteStudent,
  updateStudent,
  addStudent,
} from "../store/slice/studentsSlice";
import { useAppDispatch, useAppSelector } from "../store/store";
import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function StudentsList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [studentData, setStudentData] = useState<Student>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const columns: GridColDef<Student>[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "firstName",
      headerName: "First name",
      flex: 1,
    },
    {
      field: "lastName",
      headerName: "Last name",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "Contact",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => {
        return (
          <Box>
            <IconButton
              onClick={() => handleDialogOpen(params.row)}
              color="primary"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={() => handleDelete(params.row.id)}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const { students, loader } = useAppSelector((state) => state.students);
  const dispatch = useAppDispatch();

  const filterData = students.filter((student) =>
    student.firstName
      .toLocaleLowerCase()
      .includes(searchQuery.toLocaleLowerCase())
  );

  useEffect(() => {
    dispatch(studentsData());
  }, [dispatch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleDialogOpen = (student?: Student) => {
    if (student) {
      setStudentData(student);
    } else {
      setStudentData({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
      });
    }
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSave = () => {
    if (studentData.id) {
      dispatch(updateStudent(studentData));
    } else {
      dispatch(addStudent(studentData));
    }
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => {
    console.log(id);
    dispatch(deleteStudent(id));
  };

  return (
    <Box sx={{ height: 500, width: "100%", padding: "30px" }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
              mb: 2,
            }}
          >
            <TextField
              placeholder="Search"
              size="small"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ flexGrow: 1, maxWidth: { xs: "100%", sm: "400px" } }}
            />
            <Button
              variant="contained"
              onClick={() => handleDialogOpen()}
              sx={{
                width: { xs: "100%", sm: "auto" },
                whiteSpace: "nowrap",
              }}
            >
              Add New Student
            </Button>
          </Box>
        </Grid>
        <Grid size={{ xs: 12 }}>
          <DataGrid
            rows={filterData}
            columns={columns}
            loading={loader}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 5,
                },
              },
            }}
            pageSizeOptions={[5]}
            disableRowSelectionOnClick
          />
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>
          {studentData.id ? "Edit Student" : "Add New Student"}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="First Name"
            name="firstName"
            value={studentData.firstName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={studentData.lastName}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={studentData.email}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            name="phone"
            value={studentData.phone}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
