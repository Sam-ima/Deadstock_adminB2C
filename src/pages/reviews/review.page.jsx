import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchReviews,
  updateReview,
  deleteReview,
} from "../../store/slices/review_slice";

import ReviewsTable from "./review_table";

const ReviewsPage = () => {
  const dispatch = useDispatch();

  const { reviews, loading } = useSelector((state) => state.reviews);

  /* Pagination */
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* Fetch Reviews */
  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  /* Update */
  const handleUpdate = (id, comment) => {
    dispatch(
      updateReview({
        id,
        updatedData: { comment },
      })
    );
  };

  /* Delete */
  const handleDelete = (id) => {
    dispatch(deleteReview(id));
  };

  /* Pagination */
  const handleChangePage = (e, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0);
  };

  /* Paginated Data */
  const paginatedReviews = reviews.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      <h2>Reviews</h2>

      <ReviewsTable
        reviews={paginatedReviews}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ReviewsPage;