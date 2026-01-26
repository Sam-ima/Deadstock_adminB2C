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

const ViewProductDialog = ({
  open,
  handleClose,
  selectedProduct,
  categories,
  subcategories,
  handleEditClick,
}) => {
  if (!open || !selectedProduct) return null;

  const category = categories.find(
    (c) => c.id === selectedProduct.categoryId
  );

  const subcategory = subcategories.find(
    (s) => s.id === selectedProduct.subcategoryId
  );

  const stockValue =
    selectedProduct.availableStock ??
    selectedProduct.stock ??
    0;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h5">{selectedProduct.name}</Typography>
          <Chip
            label={selectedProduct.status || "active"}
            color={selectedProduct.status === "active" ? "success" : "default"}
            size="small"
          />
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}>
            {/* BASIC INFO */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography fontWeight="bold" gutterBottom color="primary">
                Basic Information
              </Typography>

              <Grid container spacing={1}>
                <Info label="Slug" value={selectedProduct.slug || "N/A"} mono />
                <Info
                  label="Category"
                  value={category ? `${category.icon ?? ""} ${category.name}` : "Unknown"}
                />
                <Info
                  label="Subcategory"
                  value={subcategory?.name || "Unknown"}
                />
                <Info
                  label="Created"
                  value={formatDate?.(selectedProduct.createdAt) || "-"}
                />
                <Info
                  label="Updated"
                  value={formatDate?.(selectedProduct.updatedAt) || "-"}
                />
              </Grid>
            </Paper>

            {/* PRICING */}
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography fontWeight="bold" gutterBottom color="primary">
                Pricing & Stock
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography color="text.secondary">Base Price</Typography>
                  <Typography variant="h6">
                    Rs {formatPrice?.(selectedProduct.basePrice) ?? selectedProduct.basePrice}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Current Price</Typography>
                  <Typography variant="h6">
                    Rs{" "}
                    {formatPrice?.(
                      selectedProduct.currentPrice ?? selectedProduct.basePrice
                    )}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Floor Price</Typography>
                  <Typography>
                    Rs {formatPrice?.(selectedProduct.floorPrice ?? 0)}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">Stock</Typography>
                  <Chip
                    label={stockValue}
                    color={
                      stockValue > 10
                        ? "success"
                        : stockValue > 0
                        ? "warning"
                        : "error"
                    }
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

            {/* SALES */}
            <Paper sx={{ p: 2 }}>
              <Typography fontWeight="bold" gutterBottom color="primary">
                Sales Information
              </Typography>

              <Grid container spacing={1}>
                <InfoChip label="Seller Type" value={selectedProduct.sellerType || "B2C"} />
                <InfoChip label="Sale Type" value={selectedProduct.saleType || "direct"} />

                <Grid item xs={6}>
                  <Typography color="text.secondary">Rating</Typography>
                  <Typography>
                    {selectedProduct.rating ?? 0} ({selectedProduct.reviews ?? 0} reviews)
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography color="text.secondary">B2B Verification</Typography>
                  <Chip
                    label={
                      selectedProduct.requiresB2BVerification
                        ? "Required"
                        : "Not Required"
                    }
                    size="small"
                  />
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography fontWeight="bold" gutterBottom color="primary">
                Description
              </Typography>
              <Typography>
                {selectedProduct.description || "No description available."}
              </Typography>
            </Paper>

            {Array.isArray(selectedProduct.features) && (
              <Paper sx={{ p: 2, mb: 2 }}>
                <Typography fontWeight="bold" gutterBottom color="primary">
                  Features
                </Typography>
                <ul>
                  {selectedProduct.features.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
              </Paper>
            )}

            {selectedProduct.specifications && (
              <Paper sx={{ p: 2 }}>
                <Typography fontWeight="bold" gutterBottom color="primary">
                  Specifications
                </Typography>
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

/* Small helpers for layout */
const Info = ({ label, value, mono }) => (
  <>
    <Grid item xs={4}>
      <Typography color="text.secondary">{label}:</Typography>
    </Grid>
    <Grid item xs={8}>
      <Typography sx={mono ? { fontFamily: "monospace" } : {}}>
        {value}
      </Typography>
    </Grid>
  </>
);

const InfoChip = ({ label, value }) => (
  <Grid item xs={6}>
    <Typography color="text.secondary">{label}</Typography>
    <Chip label={value} size="small" />
  </Grid>
);

export default ViewProductDialog;
