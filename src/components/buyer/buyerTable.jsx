import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Button,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

import { useDispatch, useSelector } from "react-redux";
import { fetchBuyers } from "../../store/slices/buyer_slice";

import CommonTable from "../Table/common_table";

const BuyerTable = () => {
  const dispatch = useDispatch();
  const { list: buyers, loading } = useSelector((state) => state.buyers);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ fullName: "", email: "" });

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* 🔹 Fetch buyers from Redux */
  useEffect(() => {
    dispatch(fetchBuyers());
  }, [dispatch]);

  /* 🔹 Edit */
  const handleEdit = (buyer) => {
    setEditId(buyer.id);
    setEditData({
      fullName: buyer.fullName,
      email: buyer.email,
    });
  };

  /* 🔹 Update */
  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "users", id), editData);
    dispatch(fetchBuyers());
    setEditId(null);
  };

  /* 🔹 Delete */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this buyer?")) return;

    await deleteDoc(doc(db, "users", id));
    dispatch(fetchBuyers());
  };

  /* 🔹 Table columns */
  const columns = [
    { id: "sn", label: "S.N", width: 60 },
    { id: "photo", label: "Photo" },
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "provider", label: "Provider" },
    { id: "createdAt", label: "Created At" },
    { id: "actions", label: "Actions", width: 150 },
  ];

  /* 🔹 Paginated data */
  const paginatedBuyers = buyers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <CommonTable
      columns={columns}
      data={paginatedBuyers}
      page={page}
      rowsPerPage={rowsPerPage}
      loading={loading}
      onPageChange={(_, newPage) => setPage(newPage)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      emptyMessage="No buyers found."
      renderRow={(buyer, index) => (
        <TableRow key={buyer.id}>
          {/* 🔹 S.N */}
          <TableCell>
            {page * rowsPerPage + index + 1}
          </TableCell>

          {/* 🔹 Photo (Cloudinary) */}
          <TableCell>
            <Avatar
              src={buyer.photoURL || "/placeholder-user.png"}
              alt={buyer.fullName}
              sx={{ width: 40, height: 40 }}
            />
          </TableCell>

          {/* 🔹 Full Name */}
          <TableCell>
            {editId === buyer.id ? (
              <TextField
                size="small"
                value={editData.fullName}
                onChange={(e) =>
                  setEditData({ ...editData, fullName: e.target.value })
                }
              />
            ) : (
              buyer.fullName
            )}
          </TableCell>

          {/* 🔹 Email */}
          <TableCell>
            {editId === buyer.id ? (
              <TextField
                size="small"
                value={editData.email}
                onChange={(e) =>
                  setEditData({ ...editData, email: e.target.value })
                }
              />
            ) : (
              buyer.email
            )}
          </TableCell>

          <TableCell>{buyer.provider || "-"}</TableCell>

          <TableCell>
            {buyer.createdAt?.toDate().toLocaleDateString()}
          </TableCell>

          {/* 🔹 Actions */}
          <TableCell align="center">
            {editId === buyer.id ? (
              <Button
                size="small"
                variant="contained"
                onClick={() => handleUpdate(buyer.id)}
              >
                Save
              </Button>
            ) : (
              <IconButton onClick={() => handleEdit(buyer)}>
                <EditIcon />
              </IconButton>
            )}

            <IconButton
              color="error"
              onClick={() => handleDelete(buyer.id)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default BuyerTable;
