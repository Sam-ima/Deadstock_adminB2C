import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  TextField,
  Rating,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";

import { toast } from "react-toastify"; // ✅ Import toast

import CommonTable from "../../components/Table/common_table";

const ReviewsTable = ({
  reviews,
  onUpdate,
  onDelete,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
}) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  /* Table Columns */
  const columns = [
    { id: "sn", label: "S.N" },
    { id: "user", label: "User" },
    { id: "rating", label: "Rating" },
    { id: "comment", label: "Comment" },
    { id: "actions", label: "Actions" },
  ];

  /* Edit */
  const handleEdit = (id, comment) => {
    setEditId(id);
    setEditText(comment);
  };

  /* Save */
  const handleSave = (id) => {
    onUpdate(id, editText);

    toast.success("Review updated successfully ✅"); // ✅ Toast

    setEditId(null);
    setEditText("");
  };

  /* Delete */
  const handleDelete = (id) => {
    onDelete(id);

    toast.error("Review deleted ❌"); // ✅ Toast
  };

  /* Render Row */
  const renderRow = (row, index) => (
    <TableRow key={row.id}>
      {/* S.N */}
      <TableCell>
        {page * rowsPerPage + index + 1}
      </TableCell>

      {/* User (FIXED) */}
      <TableCell>{row.userName}</TableCell>

      {/* Rating */}
      <TableCell>
        <Rating value={row.rating} readOnly />
      </TableCell>

      {/* Comment */}
      <TableCell>
        {editId === row.id ? (
          <TextField
            size="small"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            fullWidth
          />
        ) : (
          <Tooltip title={row.comment || ""} arrow>
            <Typography
              sx={{
                maxWidth: 200,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
            >
              {row.comment}
            </Typography>
          </Tooltip>
        )}
      </TableCell>

      {/* Actions */}
      <TableCell>
        {editId === row.id ? (
          <IconButton
            color="primary"
            onClick={() => handleSave(row.id)}
          >
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton
            color="primary"
            onClick={() => handleEdit(row.id, row.comment)}
          >
            <EditIcon />
          </IconButton>
        )}

        <IconButton
          color="error"
          onClick={() => handleDelete(row.id)}
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );

  return (
    <CommonTable
      columns={columns}
      data={reviews}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      emptyMessage="No reviews found."
      renderRow={renderRow}
    />
  );
};

export default ReviewsTable;