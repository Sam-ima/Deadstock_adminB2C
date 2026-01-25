import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ProductTable from "./products_table";
import ProductFilters from "./products_filters";
import { AddProductDialog, ViewProductDialog } from "./product_dialog";
import { fetchAllData, addProduct, deleteProduct } from "./product_service";
// import { addProduct } from "./product_service";

import { applyProductFilters, getPaginatedProducts } from "./product_utils";

export default function ProductsPage() {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  
  // View dialog states
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
  // Tab and filter states
  const [tabValue, setTabValue] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  const [newProduct, setNewProduct] = useState({
    name: "",
    categoryId: "",
    subcategoryId: "",
    basePrice: "",
    stock: "",
    description: "",
    status: "active",
    sellerType: "B2C",
    saleType: "direct",
  });

  //  Fetch all data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllData();
        setCategories(data.categories);
        setSubcategories(data.subcategories);
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Apply filters when dependencies change
  useEffect(() => {
    const filtered = applyProductFilters(products, searchQuery, selectedCategory, selectedSubcategory);
    setFilteredProducts(filtered);
    setPage(0); // Reset to first page when filters change
  }, [products, searchQuery, selectedCategory, selectedSubcategory]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    if (newValue === 0) {
      setSelectedCategory("all");
      setSelectedSubcategory("all");
    }
  };

  // Handle category change
  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);
    setSelectedSubcategory("all");
    setTabValue(1);
  };

  // Handle subcategory change
  const handleSubcategoryChange = (event) => {
    setSelectedSubcategory(event.target.value);
  };

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dialog handlers
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewProduct({
      name: "",
      categoryId: "",
      subcategoryId: "",
      basePrice: "",
      stock: "",
      description: "",
      status: "active",
      sellerType: "B2C",
      saleType: "direct",
    });
  };

  const handleViewClick = (product) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };
const handleEditClick = (product) => {
  setEditingProduct(product);
  setNewProduct(product);
  setOpen(true);
};


  const handleDeleteClick = async (productId) => {
  try {
    await deleteProduct(productId);

    setProducts(prev =>
      prev.filter(product => product.id !== productId)
    );
  } catch (error) {
    console.error("Delete failed", error);
  }
};

  const handleAddProduct = async () => {
  try {
    if (newProduct.id) {
      // 🔁 UPDATE
      await updateProduct(newProduct.id, {
        ...newProduct,
        updatedAt: new Date(),
      });

      setProducts(prev =>
        prev.map(p => (p.id === newProduct.id ? newProduct : p))
      );
    } else {
      // ➕ ADD
      const saved = await addProduct({
        ...newProduct,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      setProducts(prev => [...prev, saved]);
    }

    handleClose();
    setEditingProduct(null);
  } catch (err) {
    console.error("Save failed", err);
  }
};


  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setTabValue(0);
  };

  const paginatedProducts = getPaginatedProducts(filteredProducts, page, rowsPerPage);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }}>
          Products Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpen}
          sx={{ textTransform: 'none' }}
        >
          Add Product
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
            <Typography variant="h6" color="primary">{products.length}</Typography>
            <Typography variant="body2" color="text.secondary">Total Products</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
            <Typography variant="h6" color="secondary">{categories.length}</Typography>
            <Typography variant="body2" color="text.secondary">Categories</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
            <Typography variant="h6" sx={{ color: '#2e7d32' }}>{subcategories.length}</Typography>
            <Typography variant="body2" color="text.secondary">Subcategories</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
            <Typography variant="h6" sx={{ color: '#ef6c00' }}>
              {products.filter(p => p.availableStock <= 0).length}
            </Typography>
            <Typography variant="body2" color="text.secondary">Out of Stock</Typography>
          </Paper>
        </Grid>
      </Grid>
{/* 
      <Alert severity="info" sx={{ mb: 3 }}>
        Showing {filteredProducts.length} of {products.length} products
      </Alert> */}

      {/* Filters */}
      <ProductFilters
        tabValue={tabValue}
        setTabValue={setTabValue}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedSubcategory={selectedSubcategory}
        setSelectedSubcategory={setSelectedSubcategory}
        categories={categories}
        subcategories={subcategories}
        handleTabChange={handleTabChange}
        handleCategoryChange={handleCategoryChange}
        handleSubcategoryChange={handleSubcategoryChange}
        handleClearFilters={handleClearFilters}
      />

      {/* Products Table */}
      <ProductTable
        products={paginatedProducts}
        categories={categories}
        subcategories={subcategories}
        page={page}
        rowsPerPage={rowsPerPage}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        handleViewClick={handleViewClick}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
      />

      {/* Dialogs */}
      <AddProductDialog
        open={open}
        handleClose={handleClose}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        categories={categories}
        subcategories={subcategories}
        handleAddProduct={handleAddProduct}
      />

      <ViewProductDialog
        open={viewDialogOpen}
        handleClose={() => setViewDialogOpen(false)}
        selectedProduct={selectedProduct}
        categories={categories}
        subcategories={subcategories}
        handleEditClick={handleEditClick}
      />
    </Box>
  );
}




// import React, { useEffect, useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Typography,
//   IconButton,
//   Box,
//   Chip,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   MenuItem,
//   CircularProgress,
//   Select,
//   FormControl,
//   InputLabel,
//   Alert,
//   Grid,
//   Tab,
//   Tabs,
//   TablePagination,
//   Tooltip,
//   InputAdornment,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import FilterListIcon from "@mui/icons-material/FilterList";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../components/config/firebase";

// export default function ProductsPage() {
//   const [categories, setCategories] = useState([]);
//   const [subcategories, setSubcategories] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [open, setOpen] = useState(false);
  
//   // View dialog states
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [viewDialogOpen, setViewDialogOpen] = useState(false);
  
//   // Tab and filter states
//   const [tabValue, setTabValue] = useState(0); // 0: All, 1: By Category
//   const [selectedCategory, setSelectedCategory] = useState("all");
//   const [selectedSubcategory, setSelectedSubcategory] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
  
//   // Pagination
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
  
//   const [newProduct, setNewProduct] = useState({
//     name: "",
//     categoryId: "",
//     subcategoryId: "",
//     basePrice: "",
//     stock: "",
//     description: "",
//     status: "active",
//     sellerType: "B2C",
//     saleType: "direct",
//   });

//   // 🔥 Fetch all data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
        
//         // Fetch categories
//         const categoriesSnapshot = await getDocs(collection(db, "categories"));
//         const categoriesData = categoriesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setCategories(categoriesData);

//         // Fetch subcategories
//         const subcategoriesSnapshot = await getDocs(collection(db, "subcategories"));
//         const subcategoriesData = subcategoriesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setSubcategories(subcategoriesData);

//         // Fetch products
//         const productsSnapshot = await getDocs(collection(db, "products"));
//         const productsData = productsSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setProducts(productsData);
//         setFilteredProducts(productsData);
        
//       } catch (error) {
//         console.error("Failed to load data:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Apply filters when dependencies change
//   useEffect(() => {
//     let filtered = [...products];

//     // Apply search filter
//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       filtered = filtered.filter(product => 
//         product.name?.toLowerCase().includes(query) ||
//         product.description?.toLowerCase().includes(query) ||
//         product.slug?.toLowerCase().includes(query)
//       );
//     }

//     // Apply category filter
//     if (selectedCategory !== "all") {
//       filtered = filtered.filter(product => product.categoryId === selectedCategory);
//     }

//     // Apply subcategory filter (if a category is selected)
//     if (selectedSubcategory !== "all" && selectedCategory !== "all") {
//       filtered = filtered.filter(product => product.subcategoryId === selectedSubcategory);
//     }

//     setFilteredProducts(filtered);
//     setPage(0); // Reset to first page when filters change
//   }, [products, searchQuery, selectedCategory, selectedSubcategory]);

//   // Get category name by ID
//   const getCategoryName = (categoryId) => {
//     const category = categories.find(c => c.id === categoryId);
//     return category ? `${category.icon} ${category.name}` : "Unknown Category";
//   };

//   // Get subcategory name by ID
//   const getSubcategoryName = (subcategoryId) => {
//     const subcategory = subcategories.find(s => s.id === subcategoryId);
//     return subcategory ? subcategory.name : "Unknown Subcategory";
//   };

//   // Get filtered subcategories for selected category
//   const getFilteredSubcategories = () => {
//     if (selectedCategory === "all") return [];
//     return subcategories.filter(sub => sub.categoryId === selectedCategory);
//   };

//   // Format price
//   const formatPrice = (price) => {
//     if (!price && price !== 0) return "0.00";
//     return parseFloat(price).toLocaleString("en-US", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };

//   // Format date
//   const formatDate = (timestamp) => {
//     if (!timestamp) return "N/A";
//     const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
//     return date.toLocaleDateString("en-US", {
//       month: "short",
//       day: "numeric",
//       year: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   // Handle tab change
//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//     if (newValue === 0) {
//       // All products tab
//       setSelectedCategory("all");
//       setSelectedSubcategory("all");
//     }
//   };

//   // Handle category change
//   const handleCategoryChange = (event) => {
//     const categoryId = event.target.value;
//     setSelectedCategory(categoryId);
//     setSelectedSubcategory("all"); // Reset subcategory when category changes
//     setTabValue(1); // Switch to filtered view
//   };

//   // Handle subcategory change
//   const handleSubcategoryChange = (event) => {
//     setSelectedSubcategory(event.target.value);
//   };

//   // Handle pagination
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleOpen = () => setOpen(true);
//   const handleClose = () => {
//     setOpen(false);
//     setNewProduct({
//       name: "",
//       categoryId: "",
//       subcategoryId: "",
//       basePrice: "",
//       stock: "",
//       description: "",
//       status: "active",
//       sellerType: "B2C",
//       saleType: "direct",
//     });
//   };

//   // Handle view button click
//   const handleViewClick = (product) => {
//     setSelectedProduct(product);
//     setViewDialogOpen(true);
//   };

//   const handleAddProduct = async () => {
//     try {
//       const productData = {
//         ...newProduct,
//         basePrice: parseFloat(newProduct.basePrice),
//         stock: parseInt(newProduct.stock),
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         rating: 0,
//         reviews: 0,
//         sold: 0,
//       };

//       // TODO: Add to Firestore here
//       const newProductWithId = {
//         ...productData,
//         id: `temp_${Date.now()}`,
//       };
      
//       setProducts([...products, newProductWithId]);
//       handleClose();
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   // Filter subcategories for new product form
//   const filteredSubcategories = newProduct.categoryId
//     ? subcategories.filter(sub => sub.categoryId === newProduct.categoryId)
//     : [];

//   // Get paginated products
//   const paginatedProducts = filteredProducts.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   // Product Detail Dialog Component
//   const ProductDetailDialog = () => {
//     if (!selectedProduct) return null;

//     const category = categories.find(c => c.id === selectedProduct.categoryId);
//     const subcategory = subcategories.find(s => s.id === selectedProduct.subcategoryId);

//     return (
//       <Dialog 
//         open={viewDialogOpen} 
//         onClose={() => setViewDialogOpen(false)}
//         maxWidth="md"
//         fullWidth
//       >
//         <DialogTitle>
//           <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//             <Typography variant="h5" component="div">
//               {selectedProduct.name}
//             </Typography>
//             <Chip 
//               label={selectedProduct.status || "active"} 
//               color={selectedProduct.status === "active" ? "success" : "default"}
//               size="small"
//             />
//           </Box>
//         </DialogTitle>
        
//         <DialogContent dividers>
//           <Grid container spacing={3}>
//             {/* Left Column - Basic Information */}
//             <Grid item xs={12} md={6}>
//               <Paper sx={{ p: 2, mb: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                   Basic Information
//                 </Typography>
                
//                 <Grid container spacing={1}>
//                   <Grid item xs={4}>
//                     <Typography variant="body2" color="text.secondary">Slug:</Typography>
//                   </Grid>
//                   <Grid item xs={8}>
//                     <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
//                       {selectedProduct.slug || "N/A"}
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={4}>
//                     <Typography variant="body2" color="text.secondary">Category:</Typography>
//                   </Grid>
//                   <Grid item xs={8}>
//                     <Typography variant="body2">
//                       {category ? `${category.icon} ${category.name}` : "Unknown"}
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={4}>
//                     <Typography variant="body2" color="text.secondary">Subcategory:</Typography>
//                   </Grid>
//                   <Grid item xs={8}>
//                     <Typography variant="body2">
//                       {subcategory ? subcategory.name : "Unknown"}
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={4}>
//                     <Typography variant="body2" color="text.secondary">Created:</Typography>
//                   </Grid>
//                   <Grid item xs={8}>
//                     <Typography variant="body2">{formatDate(selectedProduct.createdAt)}</Typography>
//                   </Grid>

//                   <Grid item xs={4}>
//                     <Typography variant="body2" color="text.secondary">Updated:</Typography>
//                   </Grid>
//                   <Grid item xs={8}>
//                     <Typography variant="body2">{formatDate(selectedProduct.updatedAt)}</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>

//               {/* Pricing Information */}
//               <Paper sx={{ p: 2, mb: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                   Pricing & Stock
//                 </Typography>
                
//                 <Grid container spacing={1}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Base Price:</Typography>
//                     <Typography variant="h6" color="primary">
//                       Rs {formatPrice(selectedProduct.basePrice)}
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Current Price:</Typography>
//                     <Typography variant="h6" color={selectedProduct.isDepreciating ? "error" : "primary"}>
//                       Rs {formatPrice(selectedProduct.currentPrice || selectedProduct.basePrice)}
//                     </Typography>
//                     {selectedProduct.isDepreciating && (
//                       <Typography variant="caption" color="error">
//                         Depreciating Item
//                       </Typography>
//                     )}
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Floor Price:</Typography>
//                     <Typography variant="body2">
//                       Rs {formatPrice(selectedProduct.floorPrice || 0)}
//                     </Typography>
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Stock:</Typography>
//                     <Chip
//                       label={selectedProduct.stock || 0}
//                       color={
//                         selectedProduct.stock > 10 ? "success" :
//                         selectedProduct.stock > 0 ? "warning" : "error"
//                       }
//                       size="small"
//                     />
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Sold:</Typography>
//                     <Typography variant="body2">{selectedProduct.sold || 0}</Typography>
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">MOQ:</Typography>
//                     <Typography variant="body2">{selectedProduct.moq || 1}</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>

//               {/* Sales Information */}
//               <Paper sx={{ p: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                   Sales Information
//                 </Typography>
                
//                 <Grid container spacing={1}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Seller Type:</Typography>
//                     <Chip
//                       label={selectedProduct.sellerType || "B2C"}
//                       color={selectedProduct.sellerType === "B2B" ? "secondary" : "default"}
//                       size="small"
//                     />
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Sale Type:</Typography>
//                     <Chip
//                       label={selectedProduct.saleType || "direct"}
//                       color={selectedProduct.saleType === "auction" ? "warning" : "default"}
//                       size="small"
//                     />
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Rating:</Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                       <Typography variant="body2">{selectedProduct.rating || 0}</Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         ({selectedProduct.reviews || 0} reviews)
//                       </Typography>
//                     </Box>
//                   </Grid>

//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">B2B Verification:</Typography>
//                     <Chip
//                       label={selectedProduct.requiresB2BVerification ? "Required" : "Not Required"}
//                       color={selectedProduct.requiresB2BVerification ? "warning" : "default"}
//                       size="small"
//                     />
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Right Column - Details */}
//             <Grid item xs={12} md={6}>
//               {/* Description */}
//               <Paper sx={{ p: 2, mb: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                   Description
//                 </Typography>
//                 <Typography variant="body2">
//                   {selectedProduct.description || "No description available."}
//                 </Typography>
//               </Paper>

//               {/* Features */}
//               {selectedProduct.features && selectedProduct.features.length > 0 && (
//                 <Paper sx={{ p: 2, mb: 2 }}>
//                   <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                     Features
//                   </Typography>
//                   <ul style={{ margin: 0, paddingLeft: 20 }}>
//                     {selectedProduct.features.map((feature, index) => (
//                       <li key={index}>
//                         <Typography variant="body2">{feature}</Typography>
//                       </li>
//                     ))}
//                   </ul>
//                 </Paper>
//               )}

//               {/* Specifications */}
//               {selectedProduct.specifications && (
//                 <Paper sx={{ p: 2, mb: 2 }}>
//                   <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                     Specifications
//                   </Typography>
//                   <Grid container spacing={1}>
//                     {Object.entries(selectedProduct.specifications).map(([key, value]) => (
//                       <React.Fragment key={key}>
//                         <Grid item xs={4}>
//                           <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
//                             {key.replace(/([A-Z])/g, ' $1')}:
//                           </Typography>
//                         </Grid>
//                         <Grid item xs={8}>
//                           <Typography variant="body2">{value || "N/A"}</Typography>
//                         </Grid>
//                       </React.Fragment>
//                     ))}
//                   </Grid>
//                 </Paper>
//               )}

//               {/* Depreciation Info */}
//               {selectedProduct.isDepreciating && (
//                 <Paper sx={{ p: 2, bgcolor: '#fff8e1' }}>
//                   <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="warning.main">
//                     Depreciation Information
//                   </Typography>
//                   <Grid container spacing={1}>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="text.secondary">Depreciation Count:</Typography>
//                       <Typography variant="body2">{selectedProduct.depreciationCount || 0}</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="body2" color="text.secondary">Last Depreciated:</Typography>
//                       <Typography variant="body2">
//                         {formatDate(selectedProduct.lastDepreciatedAt)}
//                       </Typography>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Typography variant="body2" color="text.secondary">
//                         This product's price decreases over time automatically.
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                 </Paper>
//               )}
//             </Grid>
//           </Grid>
//         </DialogContent>
        
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setViewDialogOpen(false)}>Close</Button>
//           <Button 
//             variant="contained" 
//             startIcon={<EditIcon />}
//             onClick={() => {
//               setViewDialogOpen(false);
//               // TODO: Implement edit functionality
//               console.log("Edit product:", selectedProduct.id);
//             }}
//           >
//             Edit Product
//           </Button>
//         </DialogActions>
//       </Dialog>
//     );
//   };

//   if (loading) {
//     return (
//       <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       {/* Header */}
//       <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
//         <Typography variant="h4" sx={{ color: "#1976d2", fontWeight: "bold" }}>
//           Products Management
//         </Typography>
//         <Button
//           variant="contained"
//           startIcon={<AddIcon />}
//           onClick={handleOpen}
//           sx={{ textTransform: 'none' }}
//         >
//           Add Product
//         </Button>
//       </Box>

//       {/* Stats Cards */}
//       <Grid container spacing={2} sx={{ mb: 3 }}>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e3f2fd' }}>
//             <Typography variant="h6" color="primary">{products.length}</Typography>
//             <Typography variant="body2" color="text.secondary">Total Products</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#f3e5f5' }}>
//             <Typography variant="h6" color="secondary">{categories.length}</Typography>
//             <Typography variant="body2" color="text.secondary">Categories</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#e8f5e9' }}>
//             <Typography variant="h6" sx={{ color: '#2e7d32' }}>{subcategories.length}</Typography>
//             <Typography variant="body2" color="text.secondary">Subcategories</Typography>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={3}>
//           <Paper sx={{ p: 2, textAlign: 'center', bgcolor: '#fff3e0' }}>
//             <Typography variant="h6" sx={{ color: '#ef6c00' }}>
//               {products.filter(p => p.stock <= 0).length}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">Out of Stock</Typography>
//           </Paper>
//         </Grid>
//       </Grid>

//       {/* Tabs and Filters */}
//       <Paper sx={{ mb: 3, p: 2 }}>
//         <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
//           <Tabs value={tabValue} onChange={handleTabChange}>
//             <Tab label="All Products" />
//             <Tab label="By Category" />
//           </Tabs>
//         </Box>

//         <Grid container spacing={2} alignItems="center">
//           <Grid item xs={12} md={4}>
//             <TextField
//               fullWidth
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon />
//                   </InputAdornment>
//                 ),
//               }}
//             />
//           </Grid>
          
//           {tabValue === 1 && (
//             <>
//               <Grid item xs={12} md={3}>
//                 <FormControl fullWidth>
//                   <InputLabel>Category</InputLabel>
//                   <Select
//                     value={selectedCategory}
//                     label="Category"
//                     onChange={handleCategoryChange}
//                   >
//                     <MenuItem value="all">All Categories</MenuItem>
//                     {categories.map((category) => (
//                       <MenuItem key={category.id} value={category.id}>
//                         {category.icon} {category.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
              
//               <Grid item xs={12} md={3}>
//                 <FormControl fullWidth disabled={selectedCategory === "all"}>
//                   <InputLabel>Subcategory</InputLabel>
//                   <Select
//                     value={selectedSubcategory}
//                     label="Subcategory"
//                     onChange={handleSubcategoryChange}
//                   >
//                     <MenuItem value="all">All Subcategories</MenuItem>
//                     {getFilteredSubcategories().map((subcategory) => (
//                       <MenuItem key={subcategory.id} value={subcategory.id}>
//                         {subcategory.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                 </FormControl>
//               </Grid>
//             </>
//           )}
          
//           <Grid item xs={12} md={2}>
//             <Button
//               fullWidth
//               variant="outlined"
//               startIcon={<FilterListIcon />}
//               onClick={() => {
//                 setSearchQuery("");
//                 setSelectedCategory("all");
//                 setSelectedSubcategory("all");
//                 setTabValue(0);
//               }}
//             >
//               Clear Filters
//             </Button>
//           </Grid>
//         </Grid>
//       </Paper>

//       {/* Products Table */}
//       <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
//         <Table>
//           <TableHead sx={{ backgroundColor: "#1976d2" }}>
//             <TableRow>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "5%" }}>#</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "25%" }}>Product Details</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "15%" }}>Category</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Price</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Stock</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Status</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Created</TableCell>
//               <TableCell sx={{ color: "white", fontWeight: "bold", width: "15%" }}>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedProducts.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
//                   <Typography color="text.secondary">
//                     {searchQuery ? "No products found matching your search." : "No products available."}
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               paginatedProducts.map((product, index) => (
//                 <TableRow key={product.id} hover>
//                   <TableCell>{page * rowsPerPage + index + 1}</TableCell>
//                   <TableCell>
//                     <Box>
//                       <Typography variant="subtitle1" fontWeight="medium">
//                         {product.name}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {product.slug}
//                       </Typography>
//                       {product.description && (
//                         <Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
//                           {product.description.substring(0, 80)}...
//                         </Typography>
//                       )}
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box>
//                       <Typography variant="body2">
//                         {getCategoryName(product.categoryId)}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {getSubcategoryName(product.subcategoryId)}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Box>
//                       <Typography variant="body2" color="success.main" fontWeight="medium">
//                         Rs {formatPrice(product.currentPrice || product.basePrice)}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         Base: Rs {formatPrice(product.basePrice)}
//                       </Typography>
//                     </Box>
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={product.stock || 0}
//                       color={
//                         product.stock > 10 ? "success" :
//                         product.stock > 0 ? "warning" : "error"
//                       }
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Chip
//                       label={product.status || "active"}
//                       color={
//                         product.status === "active" ? "success" :
//                         product.status === "draft" ? "warning" : "error"
//                       }
//                       size="small"
//                     />
//                   </TableCell>
//                   <TableCell>
//                     <Typography variant="body2">
//                       {formatDate(product.createdAt)}
//                     </Typography>
//                   </TableCell>
//                   <TableCell>
//                     <Box sx={{ display: "flex", gap: 1 }}>
//                       <Tooltip title="View Details">
//                         <IconButton 
//                           size="small" 
//                           color="info"
//                           onClick={() => handleViewClick(product)}
//                         >
//                           <VisibilityIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Edit">
//                         <IconButton size="small" color="primary">
//                           <EditIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                       <Tooltip title="Delete">
//                         <IconButton size="small" color="error">
//                           <DeleteIcon fontSize="small" />
//                         </IconButton>
//                       </Tooltip>
//                     </Box>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
        
//         {/* Pagination */}
//         <TablePagination
//           rowsPerPageOptions={[5, 10, 25, 50]}
//           component="div"
//           count={filteredProducts.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </TableContainer>

//       {/* Add Product Dialog */}
//       <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//         <DialogTitle>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//             <AddIcon color="primary" />
//             <Typography variant="h6">Add New Product</Typography>
//           </Box>
//         </DialogTitle>
        
//         <DialogContent>
//           <Grid container spacing={2} sx={{ mt: 1 }}>
//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Product Name"
//                 value={newProduct.name}
//                 onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//                 required
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Slug"
//                 value={newProduct.slug || ""}
//                 onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
//                 placeholder="e.g., modern-painting-art"
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth required>
//                 <InputLabel>Category</InputLabel>
//                 <Select
//                   value={newProduct.categoryId}
//                   label="Category"
//                   onChange={(e) => {
//                     setNewProduct({ 
//                       ...newProduct, 
//                       categoryId: e.target.value,
//                       subcategoryId: "" // Reset subcategory
//                     });
//                   }}
//                 >
//                   {categories.map((category) => (
//                     <MenuItem key={category.id} value={category.id}>
//                       {category.icon} {category.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={12}>
//               <FormControl fullWidth required disabled={!newProduct.categoryId}>
//                 <InputLabel>Subcategory</InputLabel>
//                 <Select
//                   value={newProduct.subcategoryId}
//                   label="Subcategory"
//                   onChange={(e) => setNewProduct({ ...newProduct, subcategoryId: e.target.value })}
//                 >
//                   {filteredSubcategories.map((subcategory) => (
//                     <MenuItem key={subcategory.id} value={subcategory.id}>
//                       {subcategory.name}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Base Price (Rs)"
//                 type="number"
//                 value={newProduct.basePrice}
//                 onChange={(e) => setNewProduct({ ...newProduct, basePrice: e.target.value })}
//                 required
//                 inputProps={{ min: 0, step: 0.01 }}
//               />
//             </Grid>

//             <Grid item xs={6}>
//               <TextField
//                 fullWidth
//                 label="Stock"
//                 type="number"
//                 value={newProduct.stock}
//                 onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
//                 required
//                 inputProps={{ min: 0 }}
//               />
//             </Grid>

//             <Grid item xs={12}>
//               <TextField
//                 fullWidth
//                 label="Description"
//                 multiline
//                 rows={2}
//                 value={newProduct.description}
//                 onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//               />
//             </Grid>
//           </Grid>
//         </DialogContent>
        
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={handleClose}>Cancel</Button>
//           <Button 
//             variant="contained" 
//             onClick={handleAddProduct}
//             disabled={!newProduct.name || !newProduct.categoryId || !newProduct.subcategoryId || !newProduct.basePrice}
//           >
//             Add Product
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Product Detail Dialog */}
//       <ProductDetailDialog />
//     </Box>
//   );
// }