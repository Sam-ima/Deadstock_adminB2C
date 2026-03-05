import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUsers, deleteUser, updateUser } from "../../store/slices/user_slice";
import UserTable from "./user_table";

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

const [openEdit, setOpenEdit] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [editForm, setEditForm] = useState({
  fullName: "",
  phone: "",
  shopName: "",
  city: "",
});

  const { users, loading } = useSelector((state) => state.users);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

 const handleDelete = async (user) => {
  if (window.confirm("Are you sure you want to delete this user?")) {
    try {
      await dispatch(deleteUser(user.id)).unwrap();
      toast.success("User deleted successfully 🗑️");
    } catch (error) {
      toast.error("Failed to delete user ❌");
    }
  }
};

const handleEdit = (user) => {
  setSelectedUser(user);
  setEditForm({
    fullName: user.fullName || "",
    phone: user.phone || "",
    shopName: user.shopName || "",
    city: user.city || "",
  });
  setOpenEdit(true);
};


  const handleViewDetails = (user) => {
    console.log("View Details:", user);
  };

  const handleViewProducts = (user) => {
    navigate(`/products?sellerId=${user.uid}`);
  };
const handleChange = (e) => {
  setEditForm({
    ...editForm,
    [e.target.name]: e.target.value,
  });
};
const handleUpdateUser = async (id, updatedData) => {
  try {
    await dispatch(updateUser({ id, updatedData })).unwrap();
    toast.success("User updated successfully ✅");
  } catch (error) {
    toast.error("Failed to update user ❌");
  }
};

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Users Management
      </Typography>

      <UserTable
  users={users}
  page={page}
  rowsPerPage={rowsPerPage}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  loading={loading}
  onViewProducts={handleViewProducts}
  onViewDetails={handleViewDetails}
  onDelete={handleDelete}
  onUpdateUser={handleUpdateUser}
/>
    </Box>
  );
};

export default Users;