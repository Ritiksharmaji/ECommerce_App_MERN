import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback } from '@radix-ui/react-avatar';
import { Input } from '../ui/input';
import { addToCart, fetchCartItems } from '@/store/shop/cart-slice';
import { useDispatch, useSelector } from "react-redux";

import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from '@/store/shop/products-slice';

const ProductDetailsDialog = ({ open, setOpen, productDetails }) => {

  console.log(productDetails,"productDetails in details page");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();

   function handleAddtoCart(getCurrentProductId) {

    console.log("handleAddtocart call in the ProductDetailsDialog");
    console.log(getCurrentProductId, ": product id");

    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
        console.log(data, "cart data");
        if (data?.payload?.success) {
          dispatch(fetchCartItems(user?.id));
          console.log("Toast will be shown now.");
          toast({
            title: "Product added to cart!",
            description: "The product has been successfully added to your cart.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
        } else {
          console.error("Failed to add product to cart");
        }
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  }
  function handleDialogClose() {
    setOpen(false);
    // to prevent the dialog from reopening with the previous product details when we did not close the dialog and when to other page.
    dispatch(setProductDetails());
  }
  

  return (
    // Dialog component to display the product details modal
    <Dialog open={open} onOpenChange={handleDialogClose}>
      {/* DialogContent holds the main content of the dialog */}
      <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
        
        {/* Left section: Product image */}
        <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        {/* Right section: Product details */}
        <div>
          {/* Product title and description */}
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            {/* <h1 className="text-3xl font-extrabold">{productDetails?._id}</h1> */}
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>

          {/* Pricing information */}
          <div className="flex items-center justify-between">
            {/* Original price */}
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>

            {/* Sale price (only if available) */}
            {productDetails?.salePrice > 0 && (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            )}
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              <StarIcon className="w-5 h-5 text-primary" />
              <StarIcon className="w-5 h-5 text-primary" />
              <StarIcon className="w-5 h-5 text-primary" />
              <StarIcon className="w-5 h-5 text-primary" />
            </div>
            <span className="text-muted-foreground">(4.6)</span>
          </div>

          {/* Add to cart button */}
          <div className="mt-5 mb-5">
            <Button className="w-full" onClick ={()=> handleAddtoCart(productDetails?._id)}>Add to Cart</Button>
          </div>

          {/* Separator for dividing sections */}
          <Separator />

          {/* Reviews section */}
          <div className="max-h-[300px] overflow-auto">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>

            {/* Single review */}
            <div className="grid gap-6">
              <div className="flex gap-4">
                {/* Avatar of the reviewer */}
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>

                {/* Review content */}
                <div className="grid gap-1">
                  {/* Reviewer name */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ritik Sharma</h3>
                  </div>

                  {/* Reviewer star rating */}
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Review text */}
                  <p className="text-muted-foreground">
                    This is a nice product
                  </p>
                </div>
              </div>
            </div>

             {/* second  review */}
             <div className="grid gap-6">
              <div className="flex gap-4">
                {/* Avatar of the reviewer */}
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>

                {/* Review content */}
                <div className="grid gap-1">
                  {/* Reviewer name */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ritik Sharma</h3>
                  </div>

                  {/* Reviewer star rating */}
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Review text */}
                  <p className="text-muted-foreground">
                    This is a nice product
                  </p>
                </div>
              </div>
            </div>

             {/* thord  review */}
             <div className="grid gap-6">
              <div className="flex gap-4">
                {/* Avatar of the reviewer */}
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>

                {/* Review content */}
                <div className="grid gap-1">
                  {/* Reviewer name */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ritik Sharma</h3>
                  </div>

                  {/* Reviewer star rating */}
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Review text */}
                  <p className="text-muted-foreground">
                    This is a nice product
                  </p>
                </div>
              </div>
            </div>


             {/* forth  review */}
             <div className="grid gap-6">
              <div className="flex gap-4">
                {/* Avatar of the reviewer */}
                <Avatar className="w-10 h-10 border">
                  <AvatarFallback>RS</AvatarFallback>
                </Avatar>

                {/* Review content */}
                <div className="grid gap-1">
                  {/* Reviewer name */}
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold">Ritik Sharma</h3>
                  </div>

                  {/* Reviewer star rating */}
                  <div className="flex items-center gap-0.5">
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                    <StarIcon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Review text */}
                  <p className="text-muted-foreground">
                    This is a nice product
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-6 flex gap-2'>
              <Input placeholder = "Write a review"/>
              <Button>Submit</Button>
              
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailsDialog;
