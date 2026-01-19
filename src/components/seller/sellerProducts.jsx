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
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

const SellerProductsDialog = ({ open, handleClose, seller }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!seller) return;

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "products"),
          where("sellerId", "==", seller.id)
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

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
      <DialogTitle>
        Products by {seller?.shopName || seller?.fullName}
      </DialogTitle>

      <DialogContent>
        {loading ? (
          <Typography>Loading products...</Typography>
        ) : products.length === 0 ? (
          <Typography>No products found for this seller.</Typography>
        ) : (
          <Box>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableCell><b>Name</b></TableCell>
                  <TableCell><b>Price</b></TableCell>
                  <TableCell><b>Stock</b></TableCell>
                  <TableCell><b>Status</b></TableCell>
                  <TableCell><b>Sale Type</b></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} hover>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>
                      Rs. {product.currentPrice?.toFixed(2)}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <Chip
                        label={product.status}
                        color={product.status === "active" ? "success" : "default"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{product.saleType}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button variant="outlined" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellerProductsDialog;
