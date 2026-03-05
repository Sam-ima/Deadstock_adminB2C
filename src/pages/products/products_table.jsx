import React, { useState } from "react";
import {
  TableCell,
  TableRow,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
  Dialog,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CloseIcon from "@mui/icons-material/Close";

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
  // State for image preview modal
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [previewIndex, setPreviewIndex] = useState(0);

  const handleImageClick = (images, index) => {
    setPreviewImages(images);
    setPreviewIndex(index);
    setPreviewOpen(true);
  };

  const handlePrevImage = () => {
    setPreviewIndex((prev) =>
      prev === 0 ? previewImages.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setPreviewIndex((prev) =>
      prev === previewImages.length - 1 ? 0 : prev + 1
    );
  };

  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  const columns = [
    { id: "sn", label: "#", width: "5%" },
    { id: "image", label: "Image", width: "10%" },
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

      {/* Image thumbnails */}
      <TableCell>
        <Box sx={{ display: "flex", gap: 1 }}>
          {product.images?.slice(0, 3).map((img, i) => (
            <Tooltip
              key={i}
              title={
                <Box
                  component="img"
                  src={img.url}
                  sx={{
                    width: 250,
                    borderRadius: 1,
                  }}
                />
              }
              arrow
            >
              <Box
                component="img"
                src={img.url}
                alt={product.name}
                onClick={() => handleImageClick(product.images, i)}
                sx={{
                  width: 50,
                  height: 50,
                  objectFit: "cover",
                  borderRadius: 1,
                  border: img.isMain
                    ? "2px solid #1976d2"
                    : "1px solid #ddd",
                  cursor: "pointer",
                  transition: "opacity 0.2s",
                  "&:hover": { opacity: 0.8 },
                }}
              />
            </Tooltip>
          ))}

          {product.images?.length > 3 && (
            <Chip
              label={`+${product.images.length - 3}`}
              size="small"
              onClick={() => handleImageClick(product.images, 3)} // start from the 4th image
              sx={{ cursor: "pointer" }}
            />
          )}
        </Box>
      </TableCell>

      <TableCell>
        <Box>
          <Typography fontWeight="medium">{product.name}</Typography>
          {product.description && (
            <Tooltip
              title={product.description}
              followCursor
              arrow
              componentsProps={{
                tooltip: {
                  sx: { mt: 1 },
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

      <TableCell>{formatDate(product.createdAt)}</TableCell>

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
            <IconButton
              size="small"
              onClick={() => handleDeleteClick(product.id)}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
    </TableRow>
  );

  return (
    <>
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

      {/* Image Preview Modal */}
      <Dialog
  open={previewOpen}
  onClose={handleClosePreview}
  maxWidth="xl" // increase from "lg" to "xl" for wider dialog
  PaperProps={{
    sx: {
      bgcolor: "transparent",
      boxShadow: "none",
      overflow: "hidden",
      width: "50vw", // custom width (90% of viewport)
      maxHeight: "90vh",
    },
  }}
>
  <DialogContent sx={{ p: 0, position: "relative" }}>
    {/* Close button */}
    <IconButton
      onClick={handleClosePreview}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        color: "white",
        bgcolor: "rgba(0,0,0,0.5)",
        "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
        zIndex: 1,
      }}
    >
      <CloseIcon />
    </IconButton>

    {/* Main image */}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        bgcolor: "#000",
      }}
    >
      <Box
        component="img"
        src={previewImages[previewIndex]?.url}
        alt={`Product image ${previewIndex + 1}`}
        sx={{
          maxHeight: "100%",
          maxWidth: "95%", // increase max width for larger preview
          objectFit: "contain",
        }}
      />
    </Box>

    {/* Navigation arrows */}
    {previewImages.length > 1 && (
      <>
        <IconButton
          onClick={handlePrevImage}
          sx={{
            position: "absolute",
            left: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ChevronLeftIcon fontSize="large" />
        </IconButton>
        <IconButton
          onClick={handleNextImage}
          sx={{
            position: "absolute",
            right: 16,
            top: "50%",
            transform: "translateY(-50%)",
            color: "white",
            bgcolor: "rgba(0,0,0,0.5)",
            "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
          }}
        >
          <ChevronRightIcon fontSize="large" />
        </IconButton>
      </>
    )}
  </DialogContent>

  {/* Footer with image counter */}
  {previewImages.length > 1 && (
    <DialogActions
      sx={{
        justifyContent: "center",
        bgcolor: "rgba(0,0,0,0.8)",
        color: "white",
        py: 1,
      }}
    >
      <Typography>
        {previewIndex + 1} / {previewImages.length}
      </Typography>
    </DialogActions>
  )}
</Dialog>
    </>
  );
};

export default ProductTable;