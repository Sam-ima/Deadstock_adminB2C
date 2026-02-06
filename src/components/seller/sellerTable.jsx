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
  Typography,
  Box,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSellerDialog from "./editSellerDialog";
import SellerProductsDialog from "./sellerProductDetails/sellerProductsMainPage";
import { toast } from "react-toastify";
import { collection, getDocs, query, where, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

const SellerTable = () => {
  const [sellers, setSellers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openProducts, setOpenProducts] = useState(false);
  const [selectedSellerForProducts, setSelectedSellerForProducts] = useState(null);

  /* 🔹 Fetch sellers from Firestore */
  const fetchSellers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "seller"));
      const snapshot = await getDocs(q);
      const sellersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setSellers(sellersData);
    } catch (error) {
      console.error("Error fetching sellers:", error);
    }
  };

  /* 🔹 Delete seller */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      await deleteDoc(doc(db, "users", id));
      toast.success("Seller deleted successfully!");
      fetchSellers();
    }
  };

  /* 🔹 Edit seller */
  const handleEdit = (seller) => {
    setSelectedSeller(seller);
    setOpenEdit(true);
  };

  /* 🔹 View seller products */
  const handleViewProducts = (seller) => {
    setSelectedSellerForProducts(seller);
    setOpenProducts(true);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          {/* TABLE HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>S.N</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Photo</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PAN</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Shop Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <TableRow key={seller.id} hover sx={{ "&:last-child td": { borderBottom: 0 } }}>
                  <TableCell>{index + 1}</TableCell>

                  {/* 🔹 CLOUDINARY PHOTO */}
                  <TableCell>
                    <Avatar
                      src={seller.photoURL || "/placeholder-user.png"} // Cloudinary URL or fallback
                      alt={seller.fullName}
                      sx={{ width: 40, height: 40 }}
                    />
                  </TableCell>

                  <TableCell>{seller.fullName}</TableCell>
                  <TableCell>{seller.email}</TableCell>
                  <TableCell>{seller.business?.address || "-"}</TableCell>
                  <TableCell>{seller.business?.city || "-"}</TableCell>
                  <TableCell>{seller.business?.country || "-"}</TableCell>
                  <TableCell>{seller.panVat}</TableCell>
                  <TableCell>{seller.phone}</TableCell>
                  <TableCell>{seller.shopName}</TableCell>

                  {/* ACTIONS */}
                  <TableCell align="center" sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                    <Typography
                      color="info"
                      onClick={() => handleViewProducts(seller)}
                      sx={{ fontSize: "0.9rem", cursor: "pointer" }}
                    >
                      view products
                    </Typography>

                    <IconButton onClick={() => handleEdit(seller)}>
                      <EditIcon />
                    </IconButton>

                    <IconButton color="error" onClick={() => handleDelete(seller.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={11} align="center">
                  No sellers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* EDIT SELLER DIALOG */}
      <EditSellerDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        seller={selectedSeller}
        refreshData={fetchSellers}
      />

      {/* VIEW SELLER PRODUCTS DIALOG */}
      <SellerProductsDialog
        open={openProducts}
        handleClose={() => setOpenProducts(false)}
        seller={selectedSellerForProducts}
      />
    </Box>
  );
};

export default SellerTable;
