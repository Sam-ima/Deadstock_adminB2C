// src/pages/Users.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableRow, TableCell, Avatar, Chip } from "@mui/material";
import CommonTable from "../../components/Table/common_table";
import { fetchUsers } from "../../store/slices/user_slice";

const Users = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const columns = [
    { id: "photo", label: "Photo", width: 80 },
    { id: "fullName", label: "Full Name" },
    { id: "email", label: "Email" },
    { id: "phone", label: "Phone" },
    { id: "buyerType", label: "Buyer Type" },
    { id: "shopName", label: "Shop Name" },
    { id: "panVat", label: "PAN/VAT" },
    { id: "city", label: "City" },
    { id: "address", label: "Address" },
    { id: "role", label: "Role" },
  ];

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <CommonTable
      columns={columns}
      data={paginatedData}
      page={page}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      emptyMessage={loading ? "Loading..." : "No users found."}
      renderRow={(row) => (
        <TableRow key={row.id} hover>
          <TableCell>
            <Avatar src={row.photoURL} alt={row.fullName} />
          </TableCell>
          <TableCell>{row.fullName}</TableCell>
          <TableCell>{row.email}</TableCell>
          <TableCell>{row.phone}</TableCell>
          <TableCell>{row.buyerType}</TableCell>
          <TableCell>{row.shopName}</TableCell>
          <TableCell>{row.panVat}</TableCell>
          <TableCell>{row.city}</TableCell>
          <TableCell>{row.address}</TableCell>
          <TableCell>
            <Chip
              label={row.role}
              color="primary"
              size="small"
            />
          </TableCell>
        </TableRow>
      )}
    />
  );
};

export default Users;