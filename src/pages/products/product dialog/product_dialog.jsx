import React from "react";
import AddProductDialog from "./addProduct_dialog";
import ViewProductDialog from "./view_dialog";

const ProductDialog = ({
  addDialogOpen,
  viewDialogOpen,
  handleAddClose,
  handleViewClose,

  newProduct,
  setNewProduct,
  categories,
  subcategories,
  handleAddProduct,

  selectedProduct,
  handleEditClick,
}) => {
  return (
    <>
      {/* ADD / EDIT PRODUCT */}
      <AddProductDialog
        open={addDialogOpen}
        handleClose={handleAddClose}
        newProduct={newProduct}
        setNewProduct={setNewProduct}
        categories={categories}
        subcategories={subcategories}
        handleAddProduct={handleAddProduct}
      />

      {/* VIEW PRODUCT */}
      <ViewProductDialog
        open={viewDialogOpen}
        handleClose={handleViewClose}
        selectedProduct={selectedProduct}
        categories={categories}
        subcategories={subcategories}
        handleEditClick={handleEditClick}
      />
    </>
  );
};

export default ProductDialog;



// import React from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Button,
//   Box,
//   Typography,
//   Chip,
//   Paper,
//   Grid,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import EditIcon from "@mui/icons-material/Edit";
// import { formatPrice, formatDate } from "../product_utils";

// // Add Product Dialog Component
// export const AddProductDialog = ({
//   open,
//   handleClose,
//   newProduct,
//   setNewProduct,
//   categories,
//   subcategories,
//   handleAddProduct,
// }) => {
//   const filteredSubcategories = newProduct.categoryId
//     ? subcategories.filter(sub => sub.categoryId === newProduct.categoryId)
//     : [];

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle>
//         <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
//           <AddIcon color="primary" />
//           <Typography variant="h6">Add New Product</Typography>
//         </Box>
//       </DialogTitle>
      
//       <DialogContent>
//         <Grid container spacing={2} sx={{ mt: 1 }}>
//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Product Name"
//               value={newProduct.name}
//               onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//               required
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Slug"
//               value={newProduct.slug || ""}
//               onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value })}
//               placeholder="e.g., modern-painting-art"
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <FormControl fullWidth required>
//               <InputLabel>Category</InputLabel>
//               <Select
//                 value={newProduct.categoryId}
//                 label="Category"
//                 onChange={(e) => {
//                   setNewProduct({ 
//                     ...newProduct, 
//                     categoryId: e.target.value,
//                     subcategoryId: "" // Reset subcategory
//                   });
//                 }}
//               >
//                 {categories.map((category) => (
//                   <MenuItem key={category.id} value={category.id}>
//                     {category.icon} {category.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={12}>
//             <FormControl fullWidth required disabled={!newProduct.categoryId}>
//               <InputLabel>Subcategory</InputLabel>
//               <Select
//                 value={newProduct.subcategoryId}
//                 label="Subcategory"
//                 onChange={(e) => setNewProduct({ ...newProduct, subcategoryId: e.target.value })}
//               >
//                 {filteredSubcategories.map((subcategory) => (
//                   <MenuItem key={subcategory.id} value={subcategory.id}>
//                     {subcategory.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               label="Base Price (Rs)"
//               type="number"
//               value={newProduct.basePrice}
//               onChange={(e) => setNewProduct({ ...newProduct, basePrice: e.target.value })}
//               required
//               inputProps={{ min: 0, step: 0.01 }}
//             />
//           </Grid>

//           <Grid item xs={6}>
//             <TextField
//               fullWidth
//               label="Stock"
//               type="number"
//               value={newProduct.stock}
//               onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
//               required
//               inputProps={{ min: 0 }}
//             />
//           </Grid>

//           <Grid item xs={12}>
//             <TextField
//               fullWidth
//               label="Description"
//               multiline
//               rows={2}
//               value={newProduct.description}
//               onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
//             />
//           </Grid>
//         </Grid>
//       </DialogContent>
      
//       <DialogActions sx={{ p: 2 }}>
//         <Button onClick={handleClose}>Cancel</Button>
//      <Button
//   variant="contained"
//   onClick={handleAddProduct}
// >
//   {newProduct.id ? "Update Product" : "Add Product"}
// </Button>

//       </DialogActions>
//     </Dialog>
//   );
// };

// // View Product Dialog Component
// export const ViewProductDialog = ({
//   open,
//   handleClose,
//   selectedProduct,
//   categories,
//   subcategories,
//   handleEditClick,
// }) => {
//   if (!selectedProduct) return null;

//   const category = categories.find(c => c.id === selectedProduct.categoryId);
//   const subcategory = subcategories.find(s => s.id === selectedProduct.subcategoryId);

//   return (
//     <Dialog 
//       open={open} 
//       onClose={handleClose}
//       maxWidth="md"
//       fullWidth
//     >
//       <DialogTitle>
//         <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
//           <Typography variant="h5" component="div">
//             {selectedProduct.name}
//           </Typography>
//           <Chip 
//             label={selectedProduct.status || "active"} 
//             color={selectedProduct.status === "active" ? "success" : "default"}
//             size="small"
//           />
//         </Box>
//       </DialogTitle>
      
//       <DialogContent dividers>
//         <Grid container spacing={3}>
//           {/* Left Column - Basic Information */}
//           <Grid item xs={12} md={6}>
//             <Paper sx={{ p: 2, mb: 2 }}>
//               <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                 Basic Information
//               </Typography>
              
//               <Grid container spacing={1}>
//                 <Grid item xs={4}>
//                   <Typography variant="body2" color="text.secondary">Slug:</Typography>
//                 </Grid>
//                 <Grid item xs={8}>
//                   <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
//                     {selectedProduct.slug || "N/A"}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={4}>
//                   <Typography variant="body2" color="text.secondary">Category:</Typography>
//                 </Grid>
//                 <Grid item xs={8}>
//                   <Typography variant="body2">
//                     {category ? `${category.icon} ${category.name}` : "Unknown"}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={4}>
//                   <Typography variant="body2" color="text.secondary">Subcategory:</Typography>
//                 </Grid>
//                 <Grid item xs={8}>
//                   <Typography variant="body2">
//                     {subcategory ? subcategory.name : "Unknown"}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={4}>
//                   <Typography variant="body2" color="text.secondary">Created:</Typography>
//                 </Grid>
//                 <Grid item xs={8}>
//                   <Typography variant="body2">{formatDate(selectedProduct.createdAt)}</Typography>
//                 </Grid>

//                 <Grid item xs={4}>
//                   <Typography variant="body2" color="text.secondary">Updated:</Typography>
//                 </Grid>
//                 <Grid item xs={8}>
//                   <Typography variant="body2">{formatDate(selectedProduct.updatedAt)}</Typography>
//                 </Grid>
//               </Grid>
//             </Paper>

//             {/* Pricing Information */}
//             <Paper sx={{ p: 2, mb: 2 }}>
//               <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                 Pricing & Stock
//               </Typography>
              
//               <Grid container spacing={1}>
//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Base Price:</Typography>
//                   <Typography variant="h6" color="primary">
//                     Rs {formatPrice(selectedProduct.basePrice)}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Current Price:</Typography>
//                   <Typography variant="h6" color={selectedProduct.isDepreciating ? "error" : "primary"}>
//                     Rs {formatPrice(selectedProduct.currentPrice || selectedProduct.basePrice)}
//                   </Typography>
//                   {selectedProduct.isDepreciating && (
//                     <Typography variant="caption" color="error">
//                       Depreciating Item
//                     </Typography>
//                   )}
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Floor Price:</Typography>
//                   <Typography variant="body2">
//                     Rs {formatPrice(selectedProduct.floorPrice || 0)}
//                   </Typography>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Stock:</Typography>
//                   <Chip
//                       label={selectedProduct.availableStock}
//                       color={
//                         selectedProduct.availableStock > 10
//                           ? "success"
//                           : selectedProduct.availableStock > 0
//                           ? "warning"
//                           : "error"
//                       }
//                     />

//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Sold:</Typography>
//                   <Typography variant="body2">{selectedProduct.sold || 0}</Typography>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">MOQ:</Typography>
//                   <Typography variant="body2">{selectedProduct.moq || 1}</Typography>
//                 </Grid>
//               </Grid>
//             </Paper>

//             {/* Sales Information */}
//             <Paper sx={{ p: 2 }}>
//               <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                 Sales Information
//               </Typography>
              
//               <Grid container spacing={1}>
//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Seller Type:</Typography>
//                   <Chip
//                     label={selectedProduct.sellerType || "B2C"}
//                     color={selectedProduct.sellerType === "B2B" ? "secondary" : "default"}
//                     size="small"
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Sale Type:</Typography>
//                   <Chip
//                     label={selectedProduct.saleType || "direct"}
//                     color={selectedProduct.saleType === "auction" ? "warning" : "default"}
//                     size="small"
//                   />
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">Rating:</Typography>
//                   <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
//                     <Typography variant="body2">{selectedProduct.rating || 0}</Typography>
//                     <Typography variant="caption" color="text.secondary">
//                       ({selectedProduct.reviews || 0} reviews)
//                     </Typography>
//                   </Box>
//                 </Grid>

//                 <Grid item xs={6}>
//                   <Typography variant="body2" color="text.secondary">B2B Verification:</Typography>
//                   <Chip
//                     label={selectedProduct.requiresB2BVerification ? "Required" : "Not Required"}
//                     color={selectedProduct.requiresB2BVerification ? "warning" : "default"}
//                     size="small"
//                   />
//                 </Grid>
//               </Grid>
//             </Paper>
//           </Grid>

//           {/* Right Column - Details */}
//           <Grid item xs={12} md={6}>
//             {/* Description */}
//             <Paper sx={{ p: 2, mb: 2 }}>
//               <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                 Description
//               </Typography>
//               <Typography variant="body2">
//                 {selectedProduct.description || "No description available."}
//               </Typography>
//             </Paper>

//             {/* Features */}
//             {selectedProduct.features && selectedProduct.features.length > 0 && (
//               <Paper sx={{ p: 2, mb: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                   Features
//                 </Typography>
//                 <ul style={{ margin: 0, paddingLeft: 20 }}>
//                   {selectedProduct.features.map((feature, index) => (
//                     <li key={index}>
//                       <Typography variant="body2">{feature}</Typography>
//                     </li>
//                   ))}
//                 </ul>
//               </Paper>
//             )}

//             {/* Specifications */}
//             {selectedProduct.specifications && (
//               <Paper sx={{ p: 2, mb: 2 }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="primary">
//                   Specifications
//                 </Typography>
//                 <Grid container spacing={1}>
//                   {Object.entries(selectedProduct.specifications).map(([key, value]) => (
//                     <React.Fragment key={key}>
//                       <Grid item xs={4}>
//                         <Typography variant="body2" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
//                           {key.replace(/([A-Z])/g, ' $1')}:
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={8}>
//                         <Typography variant="body2">{value || "N/A"}</Typography>
//                       </Grid>
//                     </React.Fragment>
//                   ))}
//                 </Grid>
//               </Paper>
//             )}

//             {/* Depreciation Info */}
//             {selectedProduct.isDepreciating && (
//               <Paper sx={{ p: 2, bgcolor: '#fff8e1' }}>
//                 <Typography variant="subtitle1" fontWeight="bold" gutterBottom color="warning.main">
//                   Depreciation Information
//                 </Typography>
//                 <Grid container spacing={1}>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Depreciation Count:</Typography>
//                     <Typography variant="body2">{selectedProduct.depreciationCount || 0}</Typography>
//                   </Grid>
//                   <Grid item xs={6}>
//                     <Typography variant="body2" color="text.secondary">Last Depreciated:</Typography>
//                     <Typography variant="body2">
//                       {formatDate(selectedProduct.lastDepreciatedAt)}
//                     </Typography>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Typography variant="body2" color="text.secondary">
//                       This product's price decreases over time automatically.
//                     </Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             )}
//           </Grid>
//         </Grid>
//       </DialogContent>
      
//       <DialogActions sx={{ p: 2 }}>
//         <Button onClick={handleClose}>Close</Button>
//         <Button 
//           variant="contained" 
//           startIcon={<EditIcon />}
//           onClick={() => {
//             handleClose();
//             handleEditClick(selectedProduct);
//           }}
//         >
//           Edit Product
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };