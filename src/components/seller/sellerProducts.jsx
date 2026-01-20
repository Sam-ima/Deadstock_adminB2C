import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Typography,
  Chip,
  TableContainer,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  Card,
  CardContent,
  Divider,
  Stack,
  Tooltip,
  IconButton,
  Collapse,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Info as InfoIcon,
  ExpandMore,
  ExpandLess,
  Image as ImageIcon,
  Category as CategoryIcon,
  AttachMoney as MoneyIcon,
  Inventory as InventoryIcon,
  Star as StarIcon,
  Description as DescriptionIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const SellerProductsDialog = ({ open, handleClose, seller }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const pageSize = 5;

  useEffect(() => {
    if (!seller) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "products"),
          where("sellerId", "==", seller.id),
        );

        const snapshot = await getDocs(q);
        const productData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(productData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [seller]);

  const handleExpand = (productId) => {
    setExpandedProduct(expandedProduct === productId ? null : productId);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    try {
      const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
      return date.toLocaleString();
    } catch {
      return "Invalid Date";
    }
  };

  const renderSpecifications = (specs) => {
    if (!specs) return null;
    return Object.entries(specs).map(([key, value]) => (
      <Box key={key} sx={{ mb: 1 }}>
        <Typography variant="body2">
          <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
        </Typography>
      </Box>
    ));
  };

  const renderFeatures = (features) => {
    if (!features || !Array.isArray(features)) return null;
    return (
      <Stack direction="row" flexWrap="wrap" gap={1}>
        {features.map((feature, index) => (
          <Chip
            key={index}
            label={feature}
            size="small"
            variant="outlined"
            color="primary"
          />
        ))}
      </Stack>
    );
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box>
            <Typography variant="h6">
              Products by {seller?.shopName || seller?.fullName}
            </Typography>
            <Typography variant="subtitle2" color="textSecondary">
              Total Products: {products.length}
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleClose} size="small">
            Close
          </Button>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <Typography>Loading products...</Typography>
          </Box>
        ) : products.length === 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
            <Typography>No products found for this seller.</Typography>
          </Box>
        ) : (
          <Stack spacing={3}>
            {/* Summary Cards */}
           
            {/* Products Table with Expandable Details */}
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableCell width="50px">
                      <b>#</b>
                    </TableCell>
                    <TableCell>
                      <b>Product Details</b>
                    </TableCell>
                    <TableCell width="120px">
                      <b>Price</b>
                    </TableCell>
                    <TableCell width="100px">
                      <b>Stock</b>
                    </TableCell>
                    <TableCell width="100px">
                      <b>Status</b>
                    </TableCell>
                    <TableCell width="120px">
                      <b>Actions</b>
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {products.map((product, index) => (
                    <React.Fragment key={product.id}>
                      <TableRow hover>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                              {product.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                              {product.slug}
                            </Typography>
                            {/* <Typography variant="caption" display="block">
                              <PersonIcon sx={{ fontSize: 12, mr: 0.5 }} />
                              {product.sellerType}
                            </Typography> */}
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Stack>
                            <Typography variant="body2">
                              <strong>Current:</strong> Rs.{" "}
                              {product.currentPrice?.toFixed(2)}
                            </Typography>
                            <Typography variant="caption" color="textSecondary">
                              Base: Rs. {product.basePrice?.toFixed(2)}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {product.stock} unit{product.stock !== 1 ? "s" : ""}
                          </Typography>
                          <Typography variant="caption" color="textSecondary">
                            MOQ: {product.moq}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={product.status || "N/A"}
                            color={
                              product.status === "active"
                                ? "success"
                                : product.status === "inactive"
                                  ? "error"
                                  : "default"
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <IconButton
                            size="small"
                            onClick={() => handleExpand(product.id)}
                            aria-label="show details"
                          >
                            {expandedProduct === product.id ? (
                              <ExpandLess />
                            ) : (
                              <ExpandMore />
                            )}
                          </IconButton>
                        </TableCell>
                      </TableRow>

                      {/* Expanded Details Row */}
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          style={{ padding: 0, borderBottom: "none" }}
                        >
                          <Collapse
                            in={expandedProduct === product.id}
                            timeout="auto"
                            unmountOnExit
                          >
                            <Box sx={{ p: 3, backgroundColor: "#fafafa" }}>
                              <Grid container spacing={3}>
                                {/* Left Column - Basic Info */}
                                <Grid item xs={12} md={6}>
                                  <Card variant="outlined">
                                    <CardContent>
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <InfoIcon color="primary" />
                                        Basic Information
                                      </Typography>
                                      <Divider sx={{ mb: 2 }} />

                                      <Box sx={{ mt: 3 }}>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                          gutterBottom
                                        >
                                          Description
                                        </Typography>
                                        <Typography variant="body2">
                                          {product.description ||
                                            "No description available"}
                                        </Typography>
                                      </Box>

                                      <Box sx={{ mt: 3 }}>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                          gutterBottom
                                        >
                                          Features
                                        </Typography>
                                        {renderFeatures(product.features)}
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>

                                {/* Right Column - Pricing & Status */}
                                <Grid item xs={12} md={6}>
                                  <Card variant="outlined">
                                    <CardContent>
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <MoneyIcon color="primary" />
                                        Pricing & Inventory
                                      </Typography>
                                      <Divider sx={{ mb: 2 }} />

                                      <Grid container spacing={2}>
                                        <Grid item xs={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Base Price
                                          </Typography>
                                          <Typography variant="body2">
                                            Rs.{" "}
                                            {product.basePrice?.toFixed(2) ||
                                              "N/A"}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Current Price
                                          </Typography>
                                          <Typography
                                            variant="body2"
                                            fontWeight="bold"
                                            color="primary"
                                          >
                                            Rs.{" "}
                                            {product.currentPrice?.toFixed(2) ||
                                              "N/A"}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Bulk Discount
                                          </Typography>
                                          <Typography variant="body2">
                                            {product.bulkDiscount || 0}%
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Floor Price
                                          </Typography>
                                          <Typography variant="body2">
                                            Rs.{" "}
                                            {product.floorPrice?.toFixed(2) ||
                                              "N/A"}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Sale Type
                                          </Typography>
                                          <Typography variant="body2">
                                            {product.saleType}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            B2B Verification
                                          </Typography>
                                          <Typography variant="body2">
                                            {product.requiresB2BVerification
                                              ? "Required"
                                              : "Not Required"}
                                          </Typography>
                                        </Grid>
                                      </Grid>

                                      <Box sx={{ mt: 3 }}>
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                          gutterBottom
                                        >
                                          Depreciation
                                        </Typography>
                                        <Grid container spacing={2}>
                                          <Grid item xs={6}>
                                            <Typography variant="body2">
                                              <strong>Depreciating:</strong>{" "}
                                              {product.isDepreciating
                                                ? "Yes"
                                                : "No"}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={6}>
                                            <Typography variant="body2">
                                              <strong>Count:</strong>{" "}
                                              {product.depreciationCount || 0}
                                            </Typography>
                                          </Grid>
                                          <Grid item xs={12}>
                                            <Typography
                                              variant="caption"
                                              color="textSecondary"
                                            >
                                              Last Depreciated:{" "}
                                              {formatDate(
                                                product.lastDepreciatedAt,
                                              )}
                                            </Typography>
                                          </Grid>
                                        </Grid>
                                      </Box>
                                    </CardContent>
                                  </Card>
                                </Grid>

                                {/* Full Width - Specifications */}
                                <Grid item xs={12}>
                                  <Card variant="outlined">
                                    <CardContent>
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <SettingsIcon color="primary" />
                                        Specifications
                                      </Typography>
                                      <Divider sx={{ mb: 2 }} />

                                      {product.specifications ? (
                                        <Grid container spacing={3}>
                                          {Object.entries(
                                            product.specifications,
                                          ).map(([key, value]) => (
                                            <Grid
                                              item
                                              xs={12}
                                              sm={6}
                                              md={4}
                                              key={key}
                                            >
                                              <Box
                                                sx={{
                                                  p: 1,
                                                  backgroundColor: "#f8f9fa",
                                                  borderRadius: 1,
                                                }}
                                              >
                                                <Typography
                                                  variant="caption"
                                                  color="textSecondary"
                                                  display="block"
                                                >
                                                  {key.charAt(0).toUpperCase() +
                                                    key.slice(1)}
                                                </Typography>
                                                <Typography variant="body2">
                                                  {value || "Not specified"}
                                                </Typography>
                                              </Box>
                                            </Grid>
                                          ))}
                                        </Grid>
                                      ) : (
                                        <Typography
                                          variant="body2"
                                          color="textSecondary"
                                        >
                                          No specifications available
                                        </Typography>
                                      )}
                                    </CardContent>
                                  </Card>
                                </Grid>

                                {/* Timestamps */}
                                <Grid item xs={12}>
                                  <Card variant="outlined">
                                    <CardContent>
                                      <Typography
                                        variant="h6"
                                        gutterBottom
                                        sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          gap: 1,
                                        }}
                                      >
                                        <DescriptionIcon color="primary" />
                                        Timestamps
                                      </Typography>
                                      <Divider sx={{ mb: 2 }} />

                                      <Grid container spacing={2}>
                                        <Grid item xs={12} md={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Created At
                                          </Typography>
                                          <Typography variant="body2">
                                            {formatDate(product.createdAt)}
                                          </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                          <Typography
                                            variant="body2"
                                            color="textSecondary"
                                          >
                                            Updated At
                                          </Typography>
                                          <Typography variant="body2">
                                            {formatDate(product.updatedAt)}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </CardContent>
                                  </Card>
                                </Grid>
                              </Grid>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {products.length > pageSize && (
              <Typography
                variant="caption"
                sx={{
                  display: "block",
                  mt: 1,
                  textAlign: "center",
                  color: "text.secondary",
                  p: 1,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                }}
              >
                Showing all {products.length} products. Use the expand/collapse
                buttons for detailed view.
              </Typography>
            )}
          </Stack>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2, backgroundColor: "#f8f9fa" }}>
        <Typography variant="caption" color="textSecondary">
          Last updated: {new Date().toLocaleString()}
        </Typography>
        <Button variant="contained" onClick={handleClose}>
          Close Dashboard
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellerProductsDialog;
