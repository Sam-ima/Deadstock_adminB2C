import React, { useMemo } from "react";
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
import EditIcon from "@mui/icons-material/Edit";

/* ===================== UI SECTION ===================== */
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

/* ===================== COMPONENT ===================== */
const EditProductDialog = ({
  open,
  handleClose,
  product,
  setProduct,
  categories = [],
  subcategories = [],
  handleUpdateProduct,
}) => {
  if (!open || !product) return null;

  /* ---------- Handlers ---------- */
  const handleChange = field => e => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    setProduct({ ...product, [field]: value });
  };

  /* ---------- Filter subcategories by category ---------- */
  const filteredSubcategories = useMemo(() => {
    if (!product?.categoryId) return [];
    return subcategories.filter(sub => sub.categoryId === product.categoryId);
  }, [subcategories, product?.categoryId]);

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
          <EditIcon />
          <Typography variant="h6">Edit Product</Typography>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ mt: 2 }}>
        {/* ================= BASIC INFO ================= */}
        <Section title="Basic Information">
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                label="Product Name"
                fullWidth
                value={product.name || ""}
                onChange={handleChange("name")}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                label="Slug"
                fullWidth
                value={product.slug || ""}
                onChange={handleChange("slug")}
              />
            </Grid>

            {/* CATEGORY */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={product.categoryId || ""}
                  label="Category"
                  onChange={e =>
                    setProduct({
                      ...product,
                      categoryId: e.target.value,
                      subcategoryId: "",
                    })
                  }
                >
                  {categories.map(cat => (
                    <MenuItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* SUBCATEGORY */}
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={product.subcategoryId || ""}
                  label="Subcategory"
                  onChange={handleChange("subcategoryId")}
                >
                  {filteredSubcategories.map(sub => (
                    <MenuItem key={sub.id} value={sub.id}>
                      {sub.name}
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
                value={product.description || ""}
                onChange={handleChange("description")}
              />
            </Grid>

            {/* COLOR */}
            <Grid item xs={12} md={6}>
              <TextField
                label="Color (Hex Code)"
                fullWidth
                placeholder="#3F51B5"
                value={product.color || ""}
                onChange={handleChange("color")}
              />
            </Grid>
          </Grid>
        </Section>

        {/* ================= PRICING ================= */}
        <Section title="Pricing & MOQ">
          <Grid container spacing={2}>
            {[
              ["basePrice", "Base Price"],
              ["floorPrice", "Floor Price"],
              ["bulkPrice", "Bulk Price"],
              ["bulkDiscount", "Bulk Discount (%)"],
              ["moq", "MOQ"],
              ["age_days", "Age (Days)"],
            ].map(([field, label]) => (
              <Grid item xs={12} md={4} key={field}>
                <TextField
                  label={label}
                  type="number"
                  fullWidth
                  value={product[field] ?? ""}
                  onChange={handleChange(field)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* ================= STOCK ================= */}
        <Section title="Stock Information">
          <Grid container spacing={2}>
            {[
              ["stock", "Total Stock"],
              ["availableStock", "Available Stock"],
              ["reservedStock", "Reserved Stock"],
              ["sold", "Sold"],
            ].map(([field, label]) => (
              <Grid item xs={12} md={3} key={field}>
                <TextField
                  label={label}
                  type="number"
                  fullWidth
                  value={product[field] ?? ""}
                  onChange={handleChange(field)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* ================= FLAGS ================= */}
        <Section title="Product Settings">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={product.status === "active"}
                    onChange={e =>
                      setProduct({
                        ...product,
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

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdateProduct}>
          Update Product
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditProductDialog;
