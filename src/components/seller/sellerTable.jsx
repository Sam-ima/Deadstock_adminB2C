import React, { useEffect, useState } from "react";
import {
  Box,
  Avatar,
  IconButton,
  TableRow,
  TableCell,
  Tooltip,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useDispatch, useSelector } from "react-redux";
import { fetchSellers } from "../../store/slices/seller_slice";

import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

import EditSellerDialog from "./editSellerDialog";
import SellerProductsDialog from "./sellerProductDetails/sellerProductsMainPage";
import CommonTable from "../Table/common_table";

const SellerTable = () => {

  const dispatch = useDispatch();

  /* Redux Sellers */
  const { list: sellers, loading } = useSelector(
    (state) => state.sellers
  );

  const [openEdit, setOpenEdit] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);

  const [openProducts, setOpenProducts] = useState(false);
  const [selectedSellerForProducts, setSelectedSellerForProducts] =
    useState(null);

  /* Pagination */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* Fetch Sellers from Redux */
  useEffect(() => {
    dispatch(fetchSellers());
  }, [dispatch]);

  /* Delete Seller */
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this seller?")) {
      await deleteDoc(doc(db, "users", id));
      toast.success("Seller deleted successfully!");
      dispatch(fetchSellers());
    }
  };

  /* Edit Seller */
  const handleEdit = (seller) => {
    setSelectedSeller(seller);
    setOpenEdit(true);
  };

  /* View Products */
const handleViewProducts = (seller) => {
  setSelectedSellerForProducts({
    ...seller,
    sellerId: seller.uid || seller.id
  });
  setOpenProducts(true);
};

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

  /* Pagination */
  const paginatedData = sellers.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  /* Render Row */
  const renderRow = (seller, index) => {

    const address = seller.business?.address || seller.address || "-";
    const city = seller.business?.city || seller.city || "-";
    const country = seller.business?.country || seller.country || "-";
    const phone = seller.business?.phone || seller.phone || "-";
    const shopName = seller.business?.shopName || seller.shopName || "-";
    const panVat = seller.business?.panVat || seller.panVat || "-";

    return (
      <TableRow key={seller.id} hover>

        {/* SN */}
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
        <TableCell>{address}</TableCell>
        <TableCell>{city}</TableCell>
        <TableCell>{country}</TableCell>
        <TableCell>{panVat}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{shopName}</TableCell>

        {/* Actions */}
        <TableCell align="center">
          <Box sx={{ display: "flex", alignItems: "center" }}>

            {/* View Products */}
            <Tooltip title="View Products">
  <IconButton
    size="small"
    color="primary"
    onClick={() =>
      handleViewProducts({
        ...seller,
        sellerId: seller.uid || seller.id
      })
    }
  >
    <VisibilityIcon fontSize="small" />
  </IconButton>
</Tooltip>

            {/* Edit */}
            <Tooltip title="Edit Seller">
              <IconButton
                size="small"
                color="info"
                onClick={() => handleEdit(seller)}
              >
                <EditIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Delete */}
            <Tooltip title="Delete Seller">
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
  };

  return (
    <Box>

      <CommonTable
        columns={columns}
        data={paginatedData}
        page={page}
        rowsPerPage={rowsPerPage}
        loading={loading}
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
        refreshData={() => dispatch(fetchSellers())}
      />

      {/* Seller Products Dialog */}
      <SellerProductsDialog
        open={openProducts}
        handleClose={() => setOpenProducts(false)}
        seller={selectedSellerForProducts}
      />

    </Box>
  );
};

export default SellerTable;