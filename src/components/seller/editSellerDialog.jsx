import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Divider,
  InputAdornment,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import StoreIcon from "@mui/icons-material/Store";
import PhoneIcon from "@mui/icons-material/Phone";
import BadgeIcon from "@mui/icons-material/Badge";

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          borderRadius: 3,
        },
      }}
    >
      {/* HEADER */}
      <DialogTitle sx={{ fontWeight: 600 }}>
        Edit Seller Details
      </DialogTitle>

      <Divider />

      {/* CONTENT */}
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          <TextField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Email"
            name="email"
            value={formData.email}
            disabled
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="PAN / VAT"
            name="panVat"
            value={formData.panVat}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Shop Name"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <StoreIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
      </DialogContent>

      <Divider />

      {/* ACTIONS */}
      <DialogActions sx={{ p: 2 }}>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ borderRadius: 2 }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleUpdate}
          variant="contained"
          sx={{ borderRadius: 2, px: 4 }}
        >
          Update 
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSellerDialog;
