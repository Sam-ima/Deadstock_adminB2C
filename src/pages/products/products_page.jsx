import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, CircularProgress } from "@mui/material";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

import ProductTable from "./products_table";
import ProductFilters from "./products_filters";
import EditProductDialog from "./product dialog/editProduct_dialog";
import ViewProductDialog from "./product dialog/view_dialog";

import {
  fetchAllData,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../store/slices/product_slice";

export default function ProductsPage() {
  const location = useLocation();
  const dispatch = useDispatch();

  const { products, categories, subcategories, loading } = useSelector(
    (state) => state.product
  );

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [tabValue, setTabValue] = useState(location.state?.tabValue ?? 0);

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // Dialog states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllData());
  }, [dispatch]);

  // Filtered products (memoized)
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.slug?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || product.categoryId === selectedCategory;

      const matchesSubcategory =
        selectedSubcategory === "all" ||
        product.subcategoryId === selectedSubcategory;

      const matchesTab =
        tabValue === 0 ||
        (tabValue === 1 && product.status === "active") ||
        (tabValue === 2 && product.status === "draft") ||
        (tabValue === 3 && product.status === "inactive");

      return matchesSearch && matchesCategory && matchesSubcategory && matchesTab;
    });
  }, [products, searchQuery, selectedCategory, selectedSubcategory, tabValue]);

  // Handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleAddOrUpdate = async (product) => {
    try {
      if (product.id) {
        await dispatch(updateProduct({ id: product.id, data: product }));
        toast.success("✅ Product updated");
      } else {
        await dispatch(addProduct(product));
        toast.success("🎉 Product added");
      }
      setOpen(false);
    } catch {
      toast.error("❌ Something went wrong");
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
    toast.success("🗑️ Product deleted");
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", height: "80vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={600} mb={3}>
        Products Management
      </Typography>

      <ProductFilters
        tabValue={tabValue}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        selectedSubcategory={selectedSubcategory}
        categories={categories}
        subcategories={subcategories}
        handleTabChange={(e, v) => setTabValue(v)}
        handleCategoryChange={(e) => {
          setSelectedCategory(e.target.value);
          setSelectedSubcategory("all");
        }}
        handleSubcategoryChange={(e) => setSelectedSubcategory(e.target.value)}
        handleClearFilters={() => {
          setSearchQuery("");
          setSelectedCategory("all");
          setSelectedSubcategory("all");
          setTabValue(0);
        }}
      />

      {/* Product Table with pagination props */}
      <ProductTable
        products={filteredProducts}
        categories={categories}
        subcategories={subcategories}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleViewClick={(p) => {
          setSelectedProduct(p);
          setViewDialogOpen(true);
        }}
        handleEditClick={(p) => {
          setSelectedProduct(p);
          setOpen(true);
        }}
        handleDeleteClick={handleDelete}
      />

      <EditProductDialog
        open={open}
        handleClose={() => setOpen(false)}
        product={selectedProduct}
        setProduct={setSelectedProduct}
        categories={categories}
        subcategories={subcategories}
        handleUpdateProduct={() => handleAddOrUpdate(selectedProduct)}
      />

      <ViewProductDialog
        open={viewDialogOpen}
        handleClose={() => setViewDialogOpen(false)}
        selectedProduct={selectedProduct}
        categories={categories}
        subcategories={subcategories}
        handleEditClick={(p) => {
          setViewDialogOpen(false);
          setSelectedProduct(p);
          setOpen(true);
        }}
      />
    </Box>
  );
}