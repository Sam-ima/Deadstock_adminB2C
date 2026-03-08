import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Box,
  Button,
} from "@mui/material";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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
  const columns = [
    { id: "sn", label: "#", width: "5%" },
    { id: "customer", label: "Customer", width: "15%" },
    { id: "location", label: "Location", width: "15%" },
    { id: "items", label: "Items", width: "25%" },
    { id: "totalQty", label: "Total Qty", width: "5%" },
    { id: "total", label: "Total", width: "10%" },
    { id: "payment", label: "Payment", width: "10%" },
    { id: "status", label: "Status", width: "10%" },
    { id: "created", label: "Created", width: "12%" },
    { id: "actions", label: "Actions", width: "8%" },
  ];

  // Dropdown state for multi-item orders
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  const handleOpenMenu = (event, items) => {
    setMenuAnchor(event.currentTarget);
    setMenuItems(items);
  };
  const handleCloseMenu = () => {
    setMenuAnchor(null);
    setMenuItems([]);
  };

  const renderRow = (order, index) => {
    const items = order.items || [];
    const totalQty = items.reduce((sum, i) => sum + (i.quantity || 0), 0);

    return (
      <TableRow key={order.id} hover>
        <TableCell>{page * rowsPerPage + index + 1}</TableCell>

        <TableCell>
          <Typography fontWeight="medium">{order.customerName || "-"}</Typography>
          <Typography variant="caption" color="text.secondary">
            {order.deliveryDetails?.phone || "-"}
          </Typography>
        </TableCell>

        <TableCell>
          <Typography>{order.deliveryDetails?.city || "-"}</Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            {order.deliveryDetails?.address || "-"}
          </Typography>
        </TableCell>

        <TableCell>
          {items.length === 1 ? (
            <Typography>{items[0].name}</Typography>
          ) : (
            <Box>
              <Button
                size="small"
                endIcon={<ExpandMoreIcon />}
                onClick={(e) => handleOpenMenu(e, items)}
              >
                {items.length} items
              </Button>
              <Menu
                anchorEl={menuAnchor}
                open={Boolean(menuAnchor)}
                onClose={handleCloseMenu}
              >
                {menuItems.map((item, idx) => (
                  <MenuItem key={idx}>
                    {item.name} - Qty: {item.quantity}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </TableCell>

        <TableCell>{totalQty}</TableCell>
        <TableCell>Rs {order.totalAmount}</TableCell>

        <TableCell>
          <Chip label={order.paymentMethod} size="small" color="secondary" />
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
          <Typography variant="body2">{formatDate(order.createdAt)}</Typography>
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
      </TableRow>
    );
  };

  // Paginate filtered data
  const paginatedOrders = orders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <CommonTable
      columns={columns}
      data={paginatedOrders}
      page={page}
      rowsPerPage={rowsPerPage}
      count={orders.length} // filtered count
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      emptyMessage="No orders found."
      renderRow={(order, index) => renderRow(order, index)}
    />
  );
};

export default OrderTable;