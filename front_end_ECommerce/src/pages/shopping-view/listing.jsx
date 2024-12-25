import ProductFilter from "@/components/shopping-view/filter";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import { fetchAllFilteredProducts } from "@/store/shop/products-slice";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { ArrowUpDownIcon } from "lucide-react";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function ShoppingListing() {
  const dispatch = useDispatch();
  const { isLoading, productList } = useSelector((state) => state.shopProducts);

  const [sortOption, setSortOption] = useState("price-lowtohigh");

  useEffect(() => {
    const queryParams = {
      filterParams: {}, // Add filters if needed
      sortParams: sortOption, // Use selected sort option
    };

    dispatch(fetchAllFilteredProducts(queryParams));
  }, [dispatch, sortOption]);

  const handleGetProductDetails = (product) => {
    console.log("Fetching product details:", product);
  };

  const handleAddtoCart = (product) => {
    console.log("Adding to cart:", product);
  };

  const handleSortChange = (sortOption) => {
    setSortOption(sortOption);
  };

  console.log(productList, "productList");

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />

      <div className="bg-background w-full rounded-lg shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-3">
            <span className="text-muted-foreground">
              {productList ? `${productList.length} Products` : "0 Products"}
            </span>
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
                <DropdownMenuRadioGroup value={sortOption}>
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                      onSelect={() => handleSortChange(sortItem.id)}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {isLoading ? (
            <p>Loading products...</p>
          ) : productList && productList.length > 0 ? (
            productList.map((productItem) => (
              <ShoppingProductTile
                key={productItem._id}
                handleGetProductDetails={handleGetProductDetails}
                product={productItem}
                handleAddtoCart={handleAddtoCart}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ShoppingListing;
