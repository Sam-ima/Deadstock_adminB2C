import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
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
import { db } from "../firebase"; // adjust path

const BuyerTable = () => {
  const [buyers, setBuyers] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ fullName: "", email: "" });

  // 🔹 Fetch buyers
  useEffect(() => {
    const fetchBuyers = async () => {
      const q = query(
        collection(db, "users"),
        where("role", "==", "buyer")
      );

      const snapshot = await getDocs(q);
      const buyerList = snapshot.docs.map(doc => ({
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
    const userRef = doc(db, "users", id);

    await updateDoc(userRef, {
      fullName: editData.fullName,
      email: editData.email,
    });

    setBuyers(prev =>
      prev.map(b =>
        b.id === id ? { ...b, ...editData } : b
      )
    );

    setEditId(null);
  };
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this buyer?"
    );

    if (!confirmDelete) return;

    await deleteDoc(doc(db, "users", id));
    setBuyers(prev => prev.filter(b => b.id !== id));
  };
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Full Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Provider</TableCell>
            <TableCell>Created At</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {buyers.map((buyer) => (
            <TableRow key={buyer.id}>
              <TableCell>
                {editId === buyer.id ? (
                  <TextField
                    value={editData.fullName}
                    onChange={(e) =>
                      setEditData({ ...editData, fullName: e.target.value })
                    }
                    size="small"
                  />
                ) : (
                  buyer.fullName
                )}
              </TableCell>

              <TableCell>
                {editId === buyer.id ? (
                  <TextField
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    size="small"
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
                    variant="contained"
                    size="small"
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
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BuyerTable;
