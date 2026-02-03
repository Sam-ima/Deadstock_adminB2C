import React from "react";
import {
  TableCell,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

import CommonTable from "../../components/Table/common_table";
import {
  formatPrice,
  formatDate,
  getCategoryName,
  getSubcategoryName,
} from "./product_utils";

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
const columns = [
  { id: "sn", label: "#", width: "5%" },
  { id: "details", label: "Product Details", width: "20%" },
  { id: "category", label: "Category", width: "15%" },
  { id: "currentPrice", label: "Current Price", width: "10%" },
  { id: "basePrice", label: "Base Price", width: "10%" },
  { id: "stock", label: "Stock", width: "10%" },
  { id: "status", label: "Status", width: "10%" },
  { id: "created", label: "Created", width: "10%" },
  { id: "actions", label: "Actions", width: "10%" },
];

const safePage = Number.isFinite(page) ? page : 0;
const safeRowsPerPage = Number.isFinite(rowsPerPage) ? rowsPerPage : 10;
const safeProducts = Array.isArray(products) ? products : [];

const paginatedProducts = safeProducts.slice(
  safePage * safeRowsPerPage,
  safePage * safeRowsPerPage + safeRowsPerPage
);

  const renderRow = (product, index) => (
    <TableRow key={product.id} hover>
      <TableCell>
        {Number.isFinite(page) && Number.isFinite(rowsPerPage)
          ? page * rowsPerPage + index + 1
          : index + 1}
      </TableCell>
  <TableCell>
      <Box>
        <Typography fontWeight="medium">
          {product.name}
        </Typography>

        {product.description && (
          <Tooltip
                title={product.description}
                followCursor
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      mt: 1, // small gap below pointer
                    },
                  },
                }}
              >
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                maxWidth: 240,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                cursor: "pointer",
              }}
            >
              {product.description}
            </Typography>
          </Tooltip>
        )}
      </Box>
    </TableCell>

      <TableCell>
        <Typography>
          {getCategoryName(categories, product.categoryId)}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {getSubcategoryName(subcategories, product.subcategoryId)}
        </Typography>
      </TableCell>
      {/* <TableCell>
        <Box
          sx={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            border: "1px solid #ccc",
            bgcolor: (() => {
              // Use product.color if defined, else fallback to category color
              let color = product.color;
              if (!color) {
                const category = categories.find(c => c.id === product.categoryId);
                color = category?.color || "#000"; // fallback black
              }
              // Remove quotes if present
              if (color.startsWith('"') && color.endsWith('"')) {
                color = color.slice(1, -1);
              }
              return color;
            })(),
          }}
        />
      </TableCell> */}

        <TableCell>
          <Typography color="success.main">
            Rs {formatPrice(product.currentPrice || product.basePrice)}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography color="text.secondary">
            Rs {formatPrice(product.basePrice)}
          </Typography>
        </TableCell>


      <TableCell>
        <Chip
          label={product.availableStock ?? product.stock}
          color={
            product.stock > 10
              ? "success"
              : product.stock > 0
              ? "warning"
              : "error"
          }
          size="small"
        />
      </TableCell>

      <TableCell>
        <Chip
          label={product.status || "active"}
          color={
            product.status === "active"
              ? "success"
              : product.status === "draft"
              ? "warning"
              : "error"
          }
          size="small"
        />
      </TableCell>

      <TableCell>
        {formatDate(product.createdAt)}
      </TableCell>

      <TableCell>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Tooltip title="View">
            <IconButton size="small" onClick={() => handleViewClick(product)}>
              <VisibilityIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Edit">
            <IconButton size="small" onClick={() => handleEditClick(product)}>
              <EditIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton size="small" onClick={() => handleDeleteClick(product.id)}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
   <CommonTable
  columns={columns}
  data={paginatedProducts}
  totalCount={safeProducts.length}
  page={safePage}
  rowsPerPage={safeRowsPerPage}
  onPageChange={handleChangePage}
  onRowsPerPageChange={handleChangeRowsPerPage}
  emptyMessage="No products available."
  renderRow={renderRow}
/>

  );
};

export default ProductTable;

