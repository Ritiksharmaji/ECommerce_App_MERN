import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import UserCartItemsContent from "./cart-items-content";

function UserCartWrapper({ cartItems, setOpenCartSheet }) {
  const navigate = useNavigate();

  return (
    <SheetContent className="sm:max-w-md">
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
     </SheetHeader>

     <div className="mt-8 space-y-4">

     </div>
     <div className="mt-8 space-y-4">
        <div className="flex justify-between">
            <span className="font-bold">Total</span>
            <span className="font-bold">$10</span>
        </div>
     </div>
     <Button className="w-full mt-6">check Out</Button>
    </SheetContent>
  );
}

export default UserCartWrapper;