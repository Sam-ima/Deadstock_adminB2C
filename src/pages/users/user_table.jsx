import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Avatar,
  Chip,
  IconButton,
  Tooltip,
  Box,
  TextField,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import CommonTable from "../../components/Table/common_table";

const UserTable = ({
  users,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  loading,
  onDelete,
  onUpdateUser,
}) => {
  const [editRowId, setEditRowId] = useState(null);
  const [editData, setEditData] = useState({});

  const columns = [
    { id: "sn", label: "SN", width: 50 },
    { id: "photo", label: "Photo", width: 80 },
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "shopName", label: "Shop Name" },
    { id: "city", label: "City" },
    { id: "panVat", label: "PAN / VAT" },
    { id: "role", label: "Role" },
    { id: "action", label: "Action", width: 250 },
  ];

  const paginatedData = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleEditClick = (row) => {
    setEditRowId(row.id);

    setEditData({
      fullName: row.fullName || "",
      phone: row.business?.phone || row.phone || "",
      shopName: row.business?.shopName || row.shopName || "",
      city: row.business?.city || row.city || "",
      panVat: row.business?.panVat || row.panVat || "",
    });
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = (rowId) => {
    const updatedData = {
      fullName: editData.fullName,
      phone: editData.phone,
      shopName: editData.shopName,
      city: editData.city,
      panVat: editData.panVat,
    };

    onUpdateUser(rowId, updatedData);
    setEditRowId(null);
  };

  const handleCancel = () => {
    setEditRowId(null);
  };

  return (
    <CommonTable
      columns={columns}
      data={paginatedData}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      emptyMessage={loading ? "Loading..." : "No users found."}
      renderRow={(row, index) => {
        const isEditing = editRowId === row.id;

        const phone = row.business?.phone || row.phone || "-";
        const shopName = row.business?.shopName || row.shopName || "-";
        const city = row.business?.city || row.city || "-";
        const panVat = row.business?.panVat || row.panVat || "-";

        return (
          <TableRow key={row.id} hover>
            <TableCell>{page * rowsPerPage + index + 1}</TableCell>

            <TableCell>
              <Avatar src={row.photoURL} alt={row.fullName} />
            </TableCell>

            {/* FULL NAME */}
            <TableCell>
              {isEditing ? (
                <TextField
                  name="fullName"
                  value={editData.fullName}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              ) : (
                row.fullName
              )}
            </TableCell>

            {/* EMAIL */}
            <TableCell>{row.email}</TableCell>

            {/* PHONE */}
            <TableCell>
              {isEditing ? (
                <TextField
                  name="phone"
                  value={editData.phone}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              ) : (
                phone
              )}
            </TableCell>

            {/* SHOP NAME */}
            <TableCell>
              {isEditing ? (
                <TextField
                  name="shopName"
                  value={editData.shopName}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              ) : (
                shopName
              )}
            </TableCell>

            {/* CITY */}
            <TableCell>
              {isEditing ? (
                <TextField
                  name="city"
                  value={editData.city}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              ) : (
                city
              )}
            </TableCell>

            {/* PAN VAT */}
            <TableCell>
              {isEditing ? (
                <TextField
                  name="panVat"
                  value={editData.panVat}
                  onChange={handleChange}
                  size="small"
                  fullWidth
                />
              ) : (
                panVat
              )}
            </TableCell>

            {/* ROLE */}
            <TableCell>
              <Chip label={row.role} color="primary" size="small" />
            </TableCell>

            {/* ACTIONS */}
            <TableCell>
              <Box sx={{ display: "flex", gap: 1 }}>
                {isEditing ? (
                  <>
                    <IconButton
                      color="success"
                      onClick={() => handleSave(row.id)}
                    >
                      <CheckIcon />
                    </IconButton>

                    <IconButton color="error" onClick={handleCancel}>
                      <CloseIcon />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Tooltip title="Edit">
                      <IconButton
                        color="info"
                        onClick={() => handleEditClick(row)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>

                    <Tooltip title="Delete">
                      <IconButton
                        color="error"
                        onClick={() => onDelete(row)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            </TableCell>
          </TableRow>
        );
      }}
    />
  );
};

export default UserTable;