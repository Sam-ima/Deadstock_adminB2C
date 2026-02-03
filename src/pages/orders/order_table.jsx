import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import CommonTable from "../../components/Table/common_table";
import { formatDate } from "../products/product_utils";

const OrderTable = ({
  orders = [],
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleViewOrder,
  handleEditOrder,
  handleDeleteOrder,
}) => {
  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const columns = [
    { id: "sn", label: "#", width: "5%" },
    { id: "customer", label: "Customer", width: "15%" },
    { id: "location", label: "Location", width: "15%" },
    { id: "itemName", label: "Item", width: "15%" },
    { id: "quantity", label: "Qty", width: "5%" },
    { id: "total", label: "Total", width: "10%" },
    { id: "payment", label: "Payment", width: "10%" },
    { id: "status", label: "Status", width: "10%" },
    { id: "created", label: "Created", width: "12%" },
    { id: "actions", label: "Actions", width: "8%" },
  ];

  const renderRow = (order, index) => {
    // If multiple items, create multiple rows for same order
    return order.items?.map((item, idx) => (
      <TableRow key={`${order.id}_${item.productId}`} hover>
        {idx === 0 && (
          <>
            <TableCell rowSpan={order.items.length}>
              {page * rowsPerPage + index + 1}
            </TableCell>
            <TableCell rowSpan={order.items.length}>
              <Typography fontWeight="medium">
                {order.deliveryDetails?.fullName || "-"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {order.deliveryDetails?.phone || "-"}
              </Typography>
            </TableCell>
            <TableCell rowSpan={order.items.length}>
              <Typography>{order.deliveryDetails?.city || "-"}</Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {order.deliveryDetails?.address || "-"}
              </Typography>
            </TableCell>
          </>
        )}

        {/* Item name and quantity */}
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.quantity}</TableCell>

        {idx === 0 && (
          <>
            <TableCell rowSpan={order.items.length}>
              <Typography fontWeight="medium">Rs {order.totalAmount}</Typography>
            </TableCell>

            <TableCell rowSpan={order.items.length}>
              <Chip label={order.paymentMethod} size="small" color="secondary" />
            </TableCell>

            <TableCell rowSpan={order.items.length}>
              <Chip
                label={order.paymentStatus}
                size="small"
                color={
                  order.paymentStatus === "PAID"
                    ? "success"
                    : order.paymentStatus === "PENDING"
                    ? "warning"
                    : "error"
                }
              />
            </TableCell>

            <TableCell rowSpan={order.items.length}>
              <Typography variant="body2">{formatDate(order.createdAt)}</Typography>
            </TableCell>

            <TableCell rowSpan={order.items.length}>
              <Tooltip title="View Order">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleViewOrder(order)}
                >
                  <VisibilityIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit Order">
                <IconButton
                  size="small"
                  color="info"
                  onClick={() => handleEditOrder(order)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Tooltip title="Delete Order">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </TableCell>
          </>
        )}
      </TableRow>
    ));
  };

  return (
    <CommonTable
      columns={columns}
      data={paginatedOrders}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      emptyMessage="No orders found."
      renderRow={(order, index) => renderRow(order, index)}
    />
  );
};

export default OrderTable;
