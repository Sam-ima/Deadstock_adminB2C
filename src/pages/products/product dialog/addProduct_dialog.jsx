import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export const AddProductDialog = ({
  open,
  handleClose,
  newProduct,
  setNewProduct,
  categories,
  subcategories,
  handleAddProduct,
}) => {
  const filteredSubcategories = newProduct.categoryId
    ? subcategories.filter(
        (sub) => sub.categoryId === newProduct.categoryId
      )
    : [];

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AddIcon color="primary" />
          <Typography variant="h6">Add New Product</Typography>
        </Box>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Product Name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Slug"
              value={newProduct.slug || ""}
              onChange={(e) =>
                setNewProduct({ ...newProduct, slug: e.target.value })
              }
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                value={newProduct.categoryId}
                label="Category"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    categoryId: e.target.value,
                    subcategoryId: "",
                  })
                }
              >
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.icon} {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControl
              fullWidth
              required
              disabled={!newProduct.categoryId}
            >
              <InputLabel>Subcategory</InputLabel>
              <Select
                value={newProduct.subcategoryId}
                label="Subcategory"
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    subcategoryId: e.target.value,
                  })
                }
              >
                {filteredSubcategories.map((sub) => (
                  <MenuItem key={sub.id} value={sub.id}>
                    {sub.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Base Price (Rs)"
              type="number"
              value={newProduct.basePrice}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  basePrice: e.target.value,
                })
              }
              required
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              required
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={2}
              value={newProduct.description}
              onChange={(e) =>
                setNewProduct({
                  ...newProduct,
                  description: e.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAddProduct}>
          {newProduct.id ? "Update Product" : "Add Product"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default AddProductDialog;