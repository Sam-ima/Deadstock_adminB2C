import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchUsers, deleteUser, updateUser } from "../../store/slices/user_slice";
import UserTable from "./user_table";
import { useSearch } from "../../components/searchbar/searchContext"; // ✅ import the hook

const Users = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the global search query
  const { query } = useSearch();

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

  // Filter users based on search query (case‑insensitive)
  const filteredUsers = useMemo(() => {
    if (!query.trim()) return users;
    const lowerQuery = query.toLowerCase();
    return users.filter((user) => {
      return (
        (user.fullName && user.fullName.toLowerCase().includes(lowerQuery)) ||
        (user.email && user.email.toLowerCase().includes(lowerQuery)) ||
        (user.phone && user.phone.toLowerCase().includes(lowerQuery)) ||
        (user.shopName && user.shopName.toLowerCase().includes(lowerQuery)) ||
        (user.city && user.city.toLowerCase().includes(lowerQuery)) ||
        (user.panVat && user.panVat.toLowerCase().includes(lowerQuery))
      );
    });
  }, [users, query]);

  // Reset to first page when search changes
  useEffect(() => {
    setPage(0);
  }, [query]);

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
        users={filteredUsers}          // ✅ pass filtered users
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