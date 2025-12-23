import React, { useState } from "react";
import { products as initialProducts } from "../../adminStore/products";
import { categories } from "../../adminStore/catogories";
import { calculateDepreciatedPrice } from "../../adminLogic/depreciation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);

  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: "",
    basePrice: "",
    stock: "",
    status: "Active",
  });

  // Delete product
  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Open / Close Add Product form
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add new product
  const handleAddProduct = () => {
    const product = {
      id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
      ...newProduct,
      basePrice: Number(newProduct.basePrice),
      stock: Number(newProduct.stock),
      createdAt: new Date(),
    };
    setProducts([...products, product]);
    setNewProduct({ name: "", categoryId: "", basePrice: "", stock: "", status: "Active" });
    handleClose();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 2, color: "#1976d2" }}>
        Products
      </Typography>

      <Button variant="contained" color="primary" sx={{ mb: 2 }} onClick={handleOpen}>
        Add Product
      </Button>

      <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#1976d2" }}>
            <TableRow>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>SN.</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Base Price</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Depreciated</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Stock</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ color: "white", fontWeight: "bold" }}>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p, index) => {
              const category = categories.find((c) => c.id === Number(p.categoryId));
              const price = calculateDepreciatedPrice(
                p.basePrice,
                category?.depreciationRate || 0,
                p.createdAt
              );

              return (
                <TableRow key={p.id} hover sx={{ "&:hover": { backgroundColor: "#f5f5f5" } }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{p.name}</TableCell>
                  <TableCell>{category?.name || "N/A"}</TableCell>
                  <TableCell>Rs {p.basePrice}</TableCell>
                  <TableCell>Rs {price.toFixed(0)}</TableCell>
                  <TableCell>
                    <Chip label={p.stock} color={p.stock > 0 ? "success" : "error"} size="small" />
                  </TableCell>
                  <TableCell>
                    <Chip label={p.status} color={p.status === "Active" ? "primary" : "default"} size="small" />
                  </TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => alert(`Edit ${p.name}`)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(p.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add Product Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Product</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
          <TextField
            label="Product Name"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="Category"
            value={newProduct.categoryId}
            onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
            fullWidth
          >
            {categories.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Base Price"
            type="number"
            value={newProduct.basePrice}
            onChange={(e) => setNewProduct({ ...newProduct, basePrice: e.target.value })}
            fullWidth
          />
          <TextField
            label="Stock"
            type="number"
            value={newProduct.stock}
            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="Status"
            value={newProduct.status}
            onChange={(e) => setNewProduct({ ...newProduct, status: e.target.value })}
            fullWidth
          >
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Inactive">Inactive</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleAddProduct}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
