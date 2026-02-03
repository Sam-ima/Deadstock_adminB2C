import React, { useEffect, useState } from "react";
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";

import CommonTable from "../Table/common_table";

const BuyerTable = () => {
  const [buyers, setBuyers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ fullName: "", email: "" });

  // pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 🔹 Fetch buyers
  useEffect(() => {
    const fetchBuyers = async () => {
      const q = query(collection(db, "users"), where("role", "==", "buyer"));
      const snapshot = await getDocs(q);

      const buyerList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setBuyers(buyerList);
    };

    fetchBuyers();
  }, []);

  const handleEdit = (buyer) => {
    setEditId(buyer.id);
    setEditData({
      fullName: buyer.fullName,
      email: buyer.email,
    });
  };

  const handleUpdate = async (id) => {
    await updateDoc(doc(db, "users", id), editData);

    setBuyers((prev) =>
      prev.map((b) => (b.id === id ? { ...b, ...editData } : b))
    );

    setEditId(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this buyer?")) return;

    await deleteDoc(doc(db, "users", id));
    setBuyers((prev) => prev.filter((b) => b.id !== id));
  };

  // 🔹 Table columns
  const columns = [
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "provider", label: "Provider" },
    { id: "createdAt", label: "Created At" },
    { id: "actions", label: "Actions", width: 150 },
  ];

  // 🔹 Paginated data
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
      onPageChange={(_, newPage) => setPage(newPage)}
      onRowsPerPageChange={(e) => {
        setRowsPerPage(parseInt(e.target.value, 10));
        setPage(0);
      }}
      emptyMessage="No buyers found."
      renderRow={(buyer) => (
        <TableRow key={buyer.id}>
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

          <TableCell>{buyer.provider}</TableCell>

          <TableCell>
            {buyer.createdAt?.toDate().toLocaleDateString()}
          </TableCell>

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
