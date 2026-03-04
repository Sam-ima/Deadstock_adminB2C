import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  Typography,
  TableRow,
  TableCell,
   Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { db } from "../config/firebase";

import EditSellerDialog from "./editSellerDialog";
import SellerProductsDialog from "./sellerProductDetails/sellerProductsMainPage";
import CommonTable from "../Table/common_table"; 

const SellerTable = () => {
  const [sellers, setSellers] = useState([]);

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const [openProducts, setOpenProducts] = useState(false);
  const [selectedSellerForProducts, setSelectedSellerForProducts] =
    useState(null);

  /* Pagination */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* Fetch sellers */
  const fetchSellers = async () => {
    try {
      const q = query(
        collection(db, "users"),
        where("role", "==", "seller")
      );

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

  /* Delete seller */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      await deleteDoc(doc(db, "users", id));
      toast.success("Seller deleted successfully!");
      fetchSellers();
    }
  };

  /* Edit seller */
  const handleEdit = (seller) => {
    setSelectedSeller(seller);
    setOpenEdit(true);
  };

  /* View products */
  const handleViewProducts = (seller) => {
    setSelectedSellerForProducts(seller);
    setOpenProducts(true);
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  /* Table Columns */
  const columns = [
    { id: "sn", label: "S.N", width: 60 },
    { id: "photo", label: "Photo", width: 80 },
    { id: "name", label: "Name" },
    { id: "email", label: "Email" },
    { id: "address", label: "Address" },
    { id: "city", label: "City" },
    { id: "country", label: "Country" },
    { id: "pan", label: "PAN" },
    { id: "phone", label: "Phone" },
    { id: "shop", label: "Shop Name" },
    { id: "actions", label: "Actions", width: 180 },
  ];

  /* Pagination Data */
  const paginatedData = sellers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /* Render Each Row */
  const renderRow = (seller, index) => (
    <TableRow key={seller.id} hover>
      {/* S.N */}
      <TableCell>
        {page * rowsPerPage + index + 1}
      </TableCell>

      {/* Photo */}
      <TableCell>
        <Avatar
          src={seller.photoURL || "/placeholder-user.png"}
          alt={seller.fullName}
          sx={{ width: 40, height: 40 }}
        />
      </TableCell>

      <TableCell>{seller.fullName}</TableCell>
      <TableCell>{seller.email}</TableCell>
      <TableCell>{seller.business?.address || "-"}</TableCell>
      <TableCell>{seller.business?.city || "-"}</TableCell>
      <TableCell>{seller.business?.country || "-"}</TableCell>
      <TableCell>{seller.panVat || "-"}</TableCell>
      <TableCell>{seller.phone || "-"}</TableCell>
      <TableCell>{seller.shopName || "-"}</TableCell>

      {/* Actions */}
    <TableCell align="center">
  <Box
    sx={{
      display: "flex",
      // flexDirection: "column", 
      alignItems: "center",
      justifyContent: "center",
      // gap: 1,
    }}
  >
    {/* View Products */}
    <Tooltip title="View Products" arrow>
      <IconButton
        size="small"
        color="primary"
        onClick={() => handleViewProducts(seller)}
      >
        <VisibilityIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    {/* Edit */}
    <Tooltip title="Edit Seller" arrow>
      <IconButton 
        size="small"
        color="info"
        onClick={() => handleEdit(seller)}>
        <EditIcon fontSize="small" />
      </IconButton>
    </Tooltip>

    {/* Delete */}
    <Tooltip title="Delete Seller" arrow>
      <IconButton
        size="small"
        color="error"
        onClick={() => handleDelete(seller.id)}
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  </Box>
</TableCell>
    </TableRow>
  );

  return (
    <Box>
      <CommonTable
        columns={columns}
        data={paginatedData}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        emptyMessage="No sellers found"
        renderRow={renderRow}
      />

      {/* Edit Dialog */}
      <EditSellerDialog
        open={openEdit}
        handleClose={() => setOpenEdit(false)}
        seller={selectedSeller}
        refreshData={fetchSellers}
      />

      {/* Products Dialog */}
      <SellerProductsDialog
        open={openProducts}
        handleClose={() => setOpenProducts(false)}
        seller={selectedSellerForProducts}
      />
    </Box>
  );
};

export default SellerTable;