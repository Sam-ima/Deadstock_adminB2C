import React from "react";
import {
  Paper,
  Typography,
  Box,
  Tab,
  Tabs,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import { getFilteredSubcategories } from "./product_utils";

const ProductFilters = ({
  tabValue,
  setTabValue,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedSubcategory,
  setSelectedSubcategory,
  categories,
  subcategories,
  handleTabChange,
  handleCategoryChange,
  handleSubcategoryChange,
  handleClearFilters,
}) => {
  const filteredSubcategories = getFilteredSubcategories(subcategories, selectedCategory);

  return (
    <Paper sx={{ mb: 3, p: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="All Products" />
          <Tab label="By Category" />
        </Tabs>
      </Box>

      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        
        {tabValue === 1 && (
          <>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value="all">All Categories</MenuItem>
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.icon} {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={3}>
              <FormControl fullWidth disabled={selectedCategory === "all"}>
                <InputLabel>Subcategory</InputLabel>
                <Select
                  value={selectedSubcategory}
                  label="Subcategory"
                  onChange={handleSubcategoryChange}
                >
                  <MenuItem value="all">All Subcategories</MenuItem>
                  {filteredSubcategories.map((subcategory) => (
                    <MenuItem key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </>
        )}
        
        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={<FilterListIcon />}
            onClick={handleClearFilters}
          >
            Clear Filters
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductFilters;