import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { toast } from "react-toastify";

const EditSellerDialog = ({ open, handleClose, seller, refreshData }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    panVat: "",
    phone: "",
    shopName: "",
  });

  /* 🔹 Set initial data when seller changes */
  useEffect(() => {
    if (seller) {
      setFormData({
        fullName: seller.fullName || "",
        email: seller.email || "",
        panVat: seller.panVat || "",
        phone: seller.phone || "",
        shopName: seller.shopName || "",
      });
    }
  }, [seller]);

  /* 🔹 Handle input change */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* 🔹 Update seller */
  const handleUpdate = async () => {
    try {
      const sellerRef = doc(db, "users", seller.uid);

      await updateDoc(sellerRef, {
        ...formData,
        updatedAt: new Date(),
      });

      toast.success("Seller updated successfully!");
      refreshData();
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to update seller");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Seller</DialogTitle>

      <DialogContent>
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Full Name"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="PAN / VAT"
              name="panVat"
              value={formData.panVat}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Shop Name"
              name="shopName"
              value={formData.shopName}
              onChange={handleChange}
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ pr: 3, pb: 2 }}>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleUpdate} variant="contained">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSellerDialog;
