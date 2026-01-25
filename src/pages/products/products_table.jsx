import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Box,
  Chip,
  Tooltip,
  TablePagination,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { formatPrice, formatDate, getCategoryName, getSubcategoryName } from "./product_utils";

const ProductTable = ({
  products,
  categories,
  subcategories,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleViewClick,
  handleEditClick,
  handleDeleteClick,
}) => {
  return (
    <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
      <Table>
        <TableHead sx={{ backgroundColor: "#1976d2" }}>
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "5%" }}>#</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "25%" }}>Product Details</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "15%" }}>Category</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Price</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Stock</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "10%" }}>Created</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", width: "15%" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                <Typography color="text.secondary">
                  No products available.
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            products.map((product, index) => (
              <TableRow key={product.id} hover>
                <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {product.name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {product.slug}
                    </Typography>
                    {product.description && (
                      <Typography variant="body2" sx={{ mt: 0.5 }} noWrap>
                        {product.description.substring(0, 80)}...
                      </Typography>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2">
                      {getCategoryName(categories, product.categoryId)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {getSubcategoryName(subcategories, product.subcategoryId)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box>
                    <Typography variant="body2" color="success.main" fontWeight="medium">
                      Rs {formatPrice(product.currentPrice || product.basePrice)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Base: Rs {formatPrice(product.basePrice)}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip
                   label={product.availableStock ?? product.stock}

                    color={
                      product.stock > 10 ? "success" :
                      product.stock > 0 ? "warning" : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Chip
                    label={product.status || "active"}
                    color={
                      product.status === "active" ? "success" :
                      product.status === "draft" ? "warning" : "error"
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {formatDate(product.createdAt)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="View Details">
                      <IconButton 
                        size="small" 
                        color="info"
                        onClick={() => handleViewClick(product)}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton 
                        size="small" 
                        color="primary"
                        onClick={() => handleEditClick(product)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteClick(product.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      
      {/* Pagination */}
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, 50]}
        component="div"
        count={products.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default ProductTable;