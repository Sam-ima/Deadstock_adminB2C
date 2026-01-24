import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import ProductsTable from "./productTable";

const SellerProductsDialog = ({ open, handleClose, seller }) => {
  const [products, setProducts] = useState([]);
  const [expandedProduct, setExpandedProduct] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!seller) return;

    const fetchProducts = async () => {
      setLoading(true);
      const q = query(
        collection(db, "products"),
        where("sellerId", "==", seller.id)
      );
      const snapshot = await getDocs(q);
      setProducts(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
      setLoading(false);
    };

    fetchProducts();
  }, [seller]);

  const formatDate = (timestamp) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const handleExpand = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id);
  };

  const toggleDescription = (id) => {
    setExpandedDescription((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl">
      <DialogTitle>
        Products by {seller?.shopName || seller?.fullName}
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Typography align="center">Loading products...</Typography>
        ) : (
          <ProductsTable
            products={products}
            expandedProduct={expandedProduct}
            handleExpand={handleExpand}
            formatDate={formatDate}
            expandedDescription={expandedDescription}
            toggleDescription={toggleDescription}
          />
        )}
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SellerProductsDialog;
