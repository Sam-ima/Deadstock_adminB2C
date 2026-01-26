import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Box,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

import CommonTable from "../../components/Table/common_table";
import { formatDate } from "../products/product_utils";

const OrderTable = ({
  orders,
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleViewOrder,
}) => {
  const columns = [
    { id: "sn", label: "#", width: "5%" },
    { id: "orderId", label: "Order ID", width: "20%" },
    { id: "customer", label: "Customer", width: "15%" },
    { id: "location", label: "Location", width: "15%" },
    { id: "items", label: "Items", width: "8%" },
    { id: "total", label: "Total", width: "10%" },
    { id: "payment", label: "Payment", width: "10%" },
    { id: "status", label: "Status", width: "10%" },
    { id: "created", label: "Created", width: "12%" },
    { id: "actions", label: "Actions", width: "10%" },
  ];

  const renderRow = (order, index) => (
    <TableRow key={order.id} hover>
      <TableCell>{page * rowsPerPage + index + 1}</TableCell>

      <TableCell>
        <Typography variant="body2" fontWeight="medium" noWrap>
          {order.id}
        </Typography>
      </TableCell>

      <TableCell>
        <Box>
          <Typography fontWeight="medium">
            {order.deliveryDetails?.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {order.deliveryDetails?.phone}
          </Typography>
        </Box>
      </TableCell>

      <TableCell>
        <Typography variant="body2">
          {order.deliveryDetails?.city}
        </Typography>
        <Typography variant="caption" color="text.secondary" noWrap>
          {order.deliveryDetails?.address}
        </Typography>
      </TableCell>

      <TableCell align="center">
        <Chip
          label={order.items?.length || 0}
          size="small"
          color="info"
        />
      </TableCell>

      <TableCell>
        <Typography fontWeight="medium">
          Rs {order.totalAmount}
        </Typography>
      </TableCell>

      <TableCell>
        <Chip
          label={order.paymentMethod}
          size="small"
          color="secondary"
        />
      </TableCell>

      <TableCell>
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

      <TableCell>
        <Typography variant="body2">
          {formatDate(order.createdAt)}
        </Typography>
      </TableCell>

      <TableCell>
        <Tooltip title="View Order">
          <IconButton
            size="small"
            color="primary"
            onClick={() => handleViewOrder(order)}
          >
            <VisibilityIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );

  return (
    <CommonTable
      columns={columns}
      data={orders}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      emptyMessage="No orders found."
      renderRow={renderRow}
    />
  );
};

export default OrderTable;
