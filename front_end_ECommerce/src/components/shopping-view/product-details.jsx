import React from 'react';
import { Dialog, DialogContent } from '../ui/dialog';
import { StarIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Input } from '../ui/input';


const ProductDetailsDialog = ({open ,setOpen, productDetails}) => {
    return (
        // Dialog component is a wrapper component that renders a dialog box. It is used to display a dialog box on the screen.
        // we have to pass the children to the Dialog component to render the content inside the dialog box.   
        <Dialog open={open} setOpen={setOpen}>
          <DialogContent className="grid grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw]">
            
          <div className="relative overflow-hidden rounded-lg">
          <img
            src={productDetails?.image}
            alt={productDetails?.title}
            width={600}
            height={600}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="">
          <div>
            <h1 className="text-3xl font-extrabold">{productDetails?.title}</h1>
            <p className="text-muted-foreground text-2xl mb-5 mt-4">
              {productDetails?.description}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p
              className={`text-3xl font-bold text-primary ${
                productDetails?.salePrice > 0 ? "line-through" : ""
              }`}
            >
              ${productDetails?.price}
            </p>
            {productDetails?.salePrice > 0 ? (
              <p className="text-2xl font-bold text-muted-foreground">
                ${productDetails?.salePrice}
              </p>
            ) : null}

            
          </div>
         
         <div className='flex items-center gap-2 mt-2'>
         <div className="flex items-center gap-0.5">
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
            </div>
            <span className='text-muted-foreground'>(4.5)</span>
         </div>
                    
          <div className="flex items-center gap-2 mt-2">
            <h3 className='font-bold'>Ritik sharma</h3>
            <div className="flex items-center gap-0.5">
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
            </div>
            <p className='text-muted-foreground'>
                this is an awesome product
            </p>
            
          </div>

          <div className="flex items-center gap-2 mt-2">
            <h3 className='font-bold'>Ritik sharma</h3>
            <div className="flex items-center gap-0.5">
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
            </div>
            <p className='text-muted-foreground'>
                this is an awesome product
            </p>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <h3 className='font-bold'>Ritik sharma</h3>
            <div className="flex items-center gap-0.5">
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
                <StarIcon className='w-5 h-5 fill-primary' />
            </div>
            <p className='text-muted-foreground'>
                this is an awesome product
            </p>
          </div>


          <div className="mt-5 flex 00 gap-2">

            <Input placeholder = "write a review..."/>
            <Button>Submit</Button>
          
          </div>
          <Separator />

        </div>
            
            </DialogContent>  



        </Dialog>
    );
};




export default ProductDetailsDialog;
