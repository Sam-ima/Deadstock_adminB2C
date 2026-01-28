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
  Switch,
  FormControlLabel,
  Divider,
  Card,
  CardContent,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

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

const EditProductDialog = ({
  open,
  handleClose,
  product,
  setProduct,
  subcategories,
  handleUpdateProduct,
}) => {
  const handleChange = (field) => (e) => {
    const value =
      e.target.type === "number" ? Number(e.target.value) : e.target.value;

    setProduct({ ...product, [field]: value });
  };

  if (!product) return null;

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
        {/* BASIC INFO */}
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

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={product.subcategoryId || ""}
                  onChange={handleChange("subcategoryId")}
                  label="Subcategory"
                >
                  {subcategories.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
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
                value={product.description || ""}
                onChange={handleChange("description")}
              />
            </Grid>
          </Grid>
        </Section>

        {/* PRICING */}
        <Section title="Pricing">
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
                  value={product[field] ?? ""}
                  onChange={handleChange(field)}
                />
              </Grid>
            ))}
          </Grid>
        </Section>

        {/* FLAGS */}
        <Section title="Product Settings">
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={product.isDepreciating || false}
                    onChange={(e) =>
                      setProduct({
                        ...product,
                        isDepreciating: e.target.checked,
                      })
                    }
                  />
                }
                label="Depreciating"
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControlLabel
                control={
                  <Switch
                    checked={product.status === "active"}
                    onChange={(e) =>
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
