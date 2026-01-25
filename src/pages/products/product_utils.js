// Format price
export const formatPrice = (price) => {
  if (!price && price !== 0) return "0.00";
  return parseFloat(price).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Format date
export const formatDate = (timestamp) => {
  if (!timestamp) return "N/A";
  const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Get category name by ID
export const getCategoryName = (categories, categoryId) => {
  const category = categories.find(c => c.id === categoryId);
  return category ? `${category.icon} ${category.name}` : "Unknown Category";
};

// Get subcategory name by ID
export const getSubcategoryName = (subcategories, subcategoryId) => {
  const subcategory = subcategories.find(s => s.id === subcategoryId);
  return subcategory ? subcategory.name : "Unknown Subcategory";
};

// Get filtered subcategories for selected category
export const getFilteredSubcategories = (subcategories, selectedCategory) => {
  if (selectedCategory === "all") return [];
  return subcategories.filter(sub => sub.categoryId === selectedCategory);
};

// Apply filters to products
export const applyProductFilters = (products, searchQuery, selectedCategory, selectedSubcategory) => {
  let filtered = [...products];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(product => 
      product.name?.toLowerCase().includes(query) ||
      product.description?.toLowerCase().includes(query) ||
      product.slug?.toLowerCase().includes(query)
    );
  }

  // Apply category filter
  if (selectedCategory !== "all") {
    filtered = filtered.filter(product => product.categoryId === selectedCategory);
  }

  // Apply subcategory filter (if a category is selected)
  if (selectedSubcategory !== "all" && selectedCategory !== "all") {
    filtered = filtered.filter(product => product.subcategoryId === selectedSubcategory);
  }

  return filtered;
};

// Get paginated products
export const getPaginatedProducts = (products, page, rowsPerPage) => {
  return products.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
};