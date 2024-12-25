import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ShoppingListing() {
  // Initialize Redux's dispatch and toast hooks
  const dispatch = useDispatch();
  const { productList = [] } = useSelector((state) => state.shopProducts); // Get the product list from the Redux store, defaulting to an empty array

  const [filters, setFilters] = useState({}); // State to manage filters
  const [sort, setSort] = useState(null); // State to manage selected sorting option
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to manipulate the query string in the URL
  const { toast } = useToast(); // Hook for showing toast notifications

  /**
   * Function to handle the sorting of products
   * @param {string} value - The selected sorting value
   */
  function handleSort(value) {
    setSort(value); // Update the sort state with the selected value
  }

  /**
   * Function to handle filtering products based on category and subcategory options selected by the user 
   * @param {string} getSectionId - The section/category ID
   * @param {string} getCurrentOption - The selected filter option
   */
  function handleFilter(getSectionId, getCurrentOption) {
    let updatedFilters = { ...filters }; // Copy existing filters to avoid mutating state directly
    const currentOptions = updatedFilters[getSectionId] || []; // Get current options for the section

    // Add or remove the selected option from the filter list
    if (currentOptions.includes(getCurrentOption)) {
      updatedFilters[getSectionId] = currentOptions.filter(
        (option) => option !== getCurrentOption
      );
    } else {
      updatedFilters[getSectionId] = [...currentOptions, getCurrentOption];
    }

    // Remove the section if it has no options selected
    if (updatedFilters[getSectionId]?.length === 0) {
      delete updatedFilters[getSectionId];
    }

    setFilters(updatedFilters); // Update state with the new filters
    sessionStorage.setItem("filters", JSON.stringify(updatedFilters)); // Persist filters in session storage for page refresh
  }

  /**
   * Effect to initialize filters and sort on first render
   * - Loads saved filters from session storage
   * - Sets the default sort option
   */
  useEffect(() => {
    const storedFilters = JSON.parse(sessionStorage.getItem("filters")) || {}; // Retrieve stored filters or fallback to an empty object
    setFilters(storedFilters);
    setSort("price-lowtohigh"); // Default sorting
  }, []);

  
  /**
   * Effect to fetch filtered products whenever filters or sort options change
   */
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        fetchAllFilteredProducts({ filterParams: filters, sortParams: sort })
      ).catch((error) => {
        toast({
          title: "Error fetching products",
          description: error.message,
          status: "error",
        });
      });
    }
  }, [dispatch, sort, filters, toast]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      {/* Left Section: Product Filters */}
      <ProductFilter filters={filters} handleFilter={handleFilter} />

      {/* Right Section: Product Listing */}
      <div className="bg-background w-full rounded-lg shadow-sm">
        {/* Header Section: Title and Sorting Dropdown */}
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            {/* Display the total number of products */}
            <span className="text-muted-foreground">
              {productList?.length || 0} Products
            </span>

            {/* Sorting Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span>Sort by</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Product Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile product={productItem} key={productItem.id} />
            ))
          ) : (
            // Message displayed when no products are found
            <p className="text-center text-muted-foreground">No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
