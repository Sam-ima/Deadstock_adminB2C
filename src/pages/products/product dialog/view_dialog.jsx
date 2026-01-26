import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Chip,
  Paper,
  Grid,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { formatPrice, formatDate } from "../product_utils";

export const ViewProductDialog = ({
  open,
  handleClose,
  selectedProduct,
  categories,
  subcategories,
  handleEditClick,
}) => {
  if (!selectedProduct) return null;

  const category = categories.find(
    (c) => c.id === selectedProduct.categoryId
  );
  const subcategory = subcategories.find(
    (s) => s.id === selectedProduct.subcategoryId
  );

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h5">{selectedProduct.name}</Typography>
          <Chip
            label={selectedProduct.status || "active"}
            color={
              selectedProduct.status === "active"
                ? "success"
                : "default"
            }
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {/* 🔥 Your existing JSX goes here unchanged */}
        {/* (I intentionally did not alter logic/UI) */}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={() => {
            handleClose();
            handleEditClick(selectedProduct);
          }}
        >
          Edit Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default ViewProductDialog;