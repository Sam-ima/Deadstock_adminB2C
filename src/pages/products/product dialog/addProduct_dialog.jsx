import React, { useState } from "react";
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
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Section = ({ title, children }) => (
  <Card variant="outlined" sx={{ mb: 2 }}>
    <CardContent>
      <Typography variant="subtitle1" fontWeight={600} mb={1}>
        {title}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      {children}
    </CardContent>
  </Card>
);

const AddProductDialog = ({
  open,
  handleClose,
  newProduct,
  setNewProduct,
  categories,
  subcategories,
  handleAddProduct,
}) => {
  /* ------------------ LOCAL STATE ------------------ */
  const [createdCategories, setCreatedCategories] = useState([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [categoryColor, setCategoryColor] = useState("");

  /* ------------------ HANDLERS ------------------ */
  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;
    setNewProduct({ ...newProduct, [field]: value });
  };

  const handleCreateCategory = () => {
    if (!categoryInput.trim()) return;

    const newCategory = {
      id: `cat-${Date.now()}`,
      name: categoryInput,
      color: categoryColor || "#1976d2",
    };

    setCreatedCategories((prev) => [...prev, newCategory]);

    // auto select in subcategory dropdown
    setNewProduct({
      ...newProduct,
      subcategoryId: newCategory.id,
    });

    setCategoryInput("");
    setCategoryColor("");
  };

  /* ------------------ COMBINED SUBCATEGORIES ------------------ */
  const combinedSubcategories = [
    ...subcategories,
    ...createdCategories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      color: cat.color,
    })),
  ];

  /* ------------------ UI ------------------ */
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {/* HEADER */}
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <AddIcon />
          <Typography variant="h6">
            {newProduct.id ? "Update Product" : "Add New Product"}
          </Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Product Name"
                fullWidth
                required
                value={newProduct.name}
                onChange={handleChange("name")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Slug"
                fullWidth
                value={newProduct.slug}
                onChange={handleChange("slug")}
              />
            </Grid>

            {/* CATEGORY INPUT */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Category (Input)"
                fullWidth
                value={categoryInput}
                onChange={(e) => setCategoryInput(e.target.value)}
                placeholder="Type category name"
              />
            </Grid>

            {/* OPTIONAL COLOR */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Category Color (Optional)"
                fullWidth
                type="color"
                value={categoryColor}
                onChange={(e) => setCategoryColor(e.target.value)}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                variant="outlined"
                onClick={handleCreateCategory}
                sx={{ mb: 1 }}
              >
                Create Category
              </Button>
            </Grid>

            {/* SUBCATEGORY DROPDOWN */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={newProduct.subcategoryId || ""}
                  onChange={handleChange("subcategoryId")}
                  label="Subcategory"
                >
                  {combinedSubcategories.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: "50%",
                          backgroundColor: item.color || "#1976d2",
                          mr: 1,
                          display: "inline-block",
                        }}
                      />
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Description"
                fullWidth
                multiline
                rows={3}
                value={newProduct.description}
                onChange={handleChange("description")}
              />
            </Grid>
          </Grid>
        </Section>

        {/* PRICING */}
        <Section title="Pricing & Depreciation">
          <Grid container spacing={2}>
            {[
              "basePrice",
              "floorPrice",
              "bulkDiscount",
              "bulkPrice",
              "moq",
              "age_days",
            ].map((field) => (
              <Grid item xs={12} md={4} key={field}>
                <TextField
                  label={field.replace("_", " ").toUpperCase()}
                  type="number"
                  fullWidth
                  value={newProduct[field] || ""}
                  onChange={handleChange(field)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* INVENTORY */}
        <Section title="Inventory">
          <Grid container spacing={2}>
            {["stock", "availableStock", "reservedStock"].map((field) => (
              <Grid item xs={12} md={4} key={field}>
                <TextField
                  label={field.replace(/([A-Z])/g, " $1")}
                  type="number"
                  fullWidth
                  value={newProduct[field] || ""}
                  onChange={handleChange(field)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* FLAGS */}
        <Section title="Product Settings">
          <Grid container spacing={2}>
            {[
              { label: "Depreciating", field: "isDepreciating" },
              { label: "B2B Verification", field: "requiresB2BVerification" },
            ].map(({ label, field }) => (
              <Grid item xs={12} md={4} key={field}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={newProduct[field]}
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          [field]: e.target.checked,
                        })
                      }
                    />
                  }
                  label={label}
                />
              </Grid>
            ))}

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newProduct.status === "active"}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        status: e.target.checked ? "active" : "inactive",
                      })
                    }
                  />
                }
                label="Active Product"
              />
            </Grid>
          </Grid>
        </Section>
      </DialogContent>

      {/* ACTIONS */}
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
