import ProductFilter from "@/components/shopping-view/filter";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
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
import { fetchAllFilteredProducts, fetchProductDetails } from "@/store/shop/products-slice";
import { ArrowUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";




// Helper function to create a query string from the filters Object
// - Converts the object to an array of key-value pairs and encodes them as a query string 
// - Returns the query string as a string 
function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  // Iterate over the object entries and create a query string for each key-value pair
  // - If the value is an array, join the array elements with a comma separator else use the value as is 
  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  console.log(queryParams, "queryParams");

  return queryParams.join("&");
}

function ShoppingListing() {
  // Initialize Redux's dispatch and toast hooks
  const dispatch = useDispatch();
  //const { productList = [] } = useSelector((state) => state.shopProducts); // Get the product list from the Redux store, defaulting to an empty array

  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );

  const [filters, setFilters] = useState({}); // State to manage filters
  const [sort, setSort] = useState(null); // State to manage selected sorting option
  const [searchParams, setSearchParams] = useSearchParams(); // Hook to manipulate the query string in the URL
  const { toast } = useToast(); // Hook for showing toast notifications
  // this is for show the user details on dailog...
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

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


  // Effect to update the URL query string whenever filters change 
  console.log(filters ,searchParams , "filters", "searchParams");

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      // Create query string when filters exist
      // Helper function to create a query string from the filters object 
      // - Converts the object to an array of key-value pairs and encodes them as a query string 
      const createQueryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(createQueryString));
    }
    else {
      // Clear query parameters when no filters exist
      setSearchParams({});
    }
  }, [filters, setSearchParams]);

  
  /**
   * Effect to fetch filtered products whenever filters or sort options change
   */
  useEffect(() => {
    if (filters !== null && sort !== null) {
      dispatch(
        // Dispatch the fetchAllFilteredProducts action with the filters and sort options as the payload
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

console.log(productDetails, "productDetails in listing");

//  this is for fetch the data for the dailog.
useEffect(() => {
  if (productDetails !== null) setOpenDetailsDialog(true);
}, [productDetails]);


// 
  function handleGetProductDetails(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(fetchProductDetails(getCurrentProductId));
  }


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
              <ShoppingProductTile 
              handleGetProductDetails={handleGetProductDetails}
              product={productItem} key={productItem.id} />
            ))
          ) : (
            // Message displayed when no products are found
            <p className="text-center text-muted-foreground">No products found</p>
          )}
        </div>

        <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
      </div>
    </div>
  );
}

export default ShoppingListing;
