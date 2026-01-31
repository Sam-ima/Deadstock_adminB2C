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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditSellerDialog from "./editSellerDialog";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import SellerProductsDialog from "./sellerProductDetails/sellerProductsMainPage";

const SellerTable = () => {
  const [sellers, setSellers] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [openProducts, setOpenProducts] = useState(false);
  const [selectedSellerForProducts, setSelectedSellerForProducts] =
    useState(null);

  /* 🔹 Fetch sellers only */
  const fetchSellers = async () => {
    try {
      const q = query(collection(db, "users"), where("role", "==", "seller"));

      const querySnapshot = await getDocs(q);
      const sellersData = querySnapshot.docs.map((doc) => ({
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
      toast.success("Data deleted successfully!");
      fetchSellers();
    }
  };

  /* 🔹 Edit handler (navigate or open modal) */
  const handleEdit = (seller) => {
    setSelectedSeller(seller);
    setOpenEdit(true);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  const handleViewProducts = (seller) => {
    setSelectedSellerForProducts(seller);
    setOpenProducts(true);
  };

  return (
    <Box sx={{ p: 3 }}>
    
      <TableContainer component={Paper} elevation={3}>
        <Table>
          {/* TABLE HEADER */}
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell sx={{ fontWeight: "bold" }}>S.N</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Address</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>City</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Country</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>PAN</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Shop Name</TableCell>
              <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          {/* TABLE BODY */}
          <TableBody>
            {sellers.length > 0 ? (
              sellers.map((seller, index) => (
                <TableRow
                  key={seller.id}
                  hover
                  sx={{ "&:last-child td": { borderBottom: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{seller.fullName}</TableCell>
                  <TableCell>{seller.email}</TableCell>
                  <TableCell>{seller.address}</TableCell>
                  <TableCell>{seller.city}</TableCell>
                  <TableCell>{seller.country}</TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {seller.panVat}
                  </TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {seller.phone}
                  </TableCell>
                  <TableCell sx={{ textTransform: "capitalize" }}>
                    {seller.shopName}
                  </TableCell>

                  <TableCell align="center" sx={{ display: "flex" }}>
                    <Typography
                      color="info"
                      onClick={() => handleViewProducts(seller)}
                      sx={{ fontSize: "1rem", cursor: "pointer" }}
                    >
                      view products
                    </Typography>

                    <IconButton
                      //   color="primary"
                      onClick={() => handleEdit(seller)}
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDelete(seller.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No sellers found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <EditSellerDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        seller={selectedSeller}
        refreshData={fetchSellers}
      />
      <SellerProductsDialog
        open={openProducts}
        handleClose={() => setOpenProducts(false)}
        seller={selectedSellerForProducts}
      />
    </Box>
  );
};

export default SellerTable;
