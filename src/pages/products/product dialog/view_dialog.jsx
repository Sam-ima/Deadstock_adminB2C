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
  Divider,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { formatPrice, formatDate } from "../product_utils";

const ViewProductDialog = ({
  open,
  handleClose,
  selectedProduct,
  categories,
  subcategories,
  handleEditClick,
}) => {
  if (!open || !selectedProduct) return null;

  const category = categories.find(c => c.id === selectedProduct.categoryId);
  const subcategory = subcategories.find(s => s.id === selectedProduct.subcategoryId);
  const stockValue = selectedProduct.availableStock ?? selectedProduct.stock ?? 0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" fullWidth>
      {/* HEADER */}
      <DialogTitle
        sx={{
          background: "linear-gradient(135deg, #1976d2, #42a5f5)",
          color: "#fff",
          borderRadius: "8px 8px 0 0",
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={600}>
            {selectedProduct.name}
          </Typography>
          <Chip
            label={selectedProduct.status || "active"}
            color={selectedProduct.status === "active" ? "success" : "default"}
            size="small"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: "#f9f9f9", py: 3 }}>
        <Grid container spacing={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}>
            {/* BASIC INFO */}
            <Paper
              elevation={4}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Typography fontWeight={700} color="primary" mb={2}>
                Basic Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={1}>
                <Info label="Category" value={category?.name || "Unknown"} />
                <Info label="Subcategory" value={subcategory?.name || "Unknown"} />
                <Info label="Created" value={formatDate?.(selectedProduct.createdAt) || "-"} />
                <Info label="Updated" value={formatDate?.(selectedProduct.updatedAt) || "-"} />
              </Grid>
            </Paper>

            {/* PRICING & STOCK */}
            <Paper
              elevation={4}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Typography fontWeight={700} color="primary" mb={2}>
                Pricing & Stock
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Base Price</Typography>
                  <Typography variant="h6" fontWeight={500}>
                    Rs {formatPrice?.(selectedProduct.basePrice) ?? selectedProduct.basePrice}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Current Price</Typography>
                  <Typography variant="h6" fontWeight={500}>
                    Rs {formatPrice?.(selectedProduct.currentPrice ?? selectedProduct.basePrice)}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Floor Price</Typography>
                  <Typography>Rs {formatPrice?.(selectedProduct.floorPrice ?? 0)}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Stock</Typography>
                  <Chip
                    label={stockValue}
                    color={
                      stockValue > 10 ? "success" : stockValue > 0 ? "warning" : "error"
                    }
                    sx={{ fontWeight: 500 }}
                  />
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Sold</Typography>
                  <Typography>{selectedProduct.sold ?? 0}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">MOQ</Typography>
                  <Typography>{selectedProduct.moq ?? 1}</Typography>
                </Grid>
              </Grid>
            </Paper>

            {/* SALES INFO */}
            <Paper
              elevation={4}
              sx={{
                p: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Typography fontWeight={700} color="primary" mb={2}>
                Sales Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <InfoChip label="Seller Type" value={selectedProduct.sellerType || "B2C"} />
                <InfoChip label="Sale Type" value={selectedProduct.saleType || "direct"} />
                <Grid item xs={6}>
                  <Typography color="text.secondary">Rating</Typography>
                  <Typography>
                    {selectedProduct.rating ?? 0} ({selectedProduct.reviews ?? 0} reviews)
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={6}>
            {/* DESCRIPTION */}
            <Paper
              elevation={4}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 3,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 },
              }}
            >
              <Typography fontWeight={700} color="primary" mb={2}>
                Description
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography>{selectedProduct.description || "No description available."}</Typography>
            </Paper>

            {/* FEATURES */}
            {Array.isArray(selectedProduct.features) && selectedProduct.features.length > 0 && (
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  mb: 3,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Typography fontWeight={700} color="primary" mb={2}>
                  Features
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <ul style={{ paddingLeft: 20 }}>
                  {selectedProduct.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </Paper>
            )}

            {/* SPECIFICATIONS */}
            {selectedProduct.specifications && Object.keys(selectedProduct.specifications).length > 0 && (
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: 3,
                  transition: "0.3s",
                  "&:hover": { boxShadow: 6 },
                }}
              >
                <Typography fontWeight={700} color="primary" mb={2}>
                  Specifications
                </Typography>
                <Divider sx={{ mb: 1 }} />
                <Grid container spacing={1}>
                  {Object.entries(selectedProduct.specifications).map(([k, v]) => (
                    <React.Fragment key={k}>
                      <Grid item xs={4}>
                        <Typography color="text.secondary">
                          {k.replace(/([A-Z])/g, " $1")}
                        </Typography>
                      </Grid>
                      <Grid item xs={8}>
                        <Typography>{v || "N/A"}</Typography>
                      </Grid>
                    </React.Fragment>
                  ))}
                </Grid>
              </Paper>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
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

/* Helper components */
const Info = ({ label, value }) => (
  <>
    <Grid item xs={4}>
      <Typography color="text.secondary">{label}:</Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography>{value}</Typography>
    </Grid>
  </>
);

const InfoChip = ({ label, value }) => (
  <Grid item xs={6}>
    <Typography color="text.secondary">{label}</Typography>
    <Chip label={value} size="small" sx={{ fontWeight: 500 }} />
  </Grid>
);

export default ViewProductDialog;
