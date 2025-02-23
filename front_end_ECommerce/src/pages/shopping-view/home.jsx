import React, { useState, useEffect } from 'react';
import bannerOne from "../../assets/banner-1.webp";
import bannerTwo from "../../assets/banner-2.webp";
import bannerThree from "../../assets/banner-3.webp";
import { Airplay, BabyIcon, ChevronLeftIcon, ChevronRightIcon, CloudLightning, Heater, Images, Shirt, ShirtIcon, ShoppingBasket, UmbrellaIcon, WashingMachine, WatchIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllFilteredProducts } from '@/store/shop/products-slice';
import ShoppingProductTile from '@/components/shopping-view/product-tile';

const ShoppingHome = () => {
    const slides = [bannerOne, bannerTwo, bannerThree];
    const [currentIndex, setCurrentIndex] = useState(0);

    const categoriesWithIcon = [
        { id: "men", label: "Men", icon: ShirtIcon },
        { id: "women", label: "Women", icon: CloudLightning },
        { id: "kids", label: "Kids", icon: BabyIcon },
        { id: "accessories", label: "Accessories", icon: WatchIcon },
        { id: "footwear", label: "Footwear", icon: UmbrellaIcon },
    ];

    const brandsWithIcon = [
        { id: "nike", label: "Nike", icon: Shirt },
        { id: "adidas", label: "Adidas", icon: WashingMachine },
        { id: "puma", label: "Puma", icon: ShoppingBasket },
        { id: "levi", label: "Levi's", icon: Airplay },
        { id: "zara", label: "Zara", icon: Images },
        { id: "h&m", label: "H&M", icon: Heater },
      ];

    const{productList} = useSelector((state) => state.shopProducts);
    const dispatch = useDispatch();

    console.log("productList", productList);


    useEffect(()=>{
        dispatch(fetchAllFilteredProducts({fiterParams:{}, sortParams:'price-lowtohigh'}));

    }, []);



    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
        }, 3000); // Auto-slide every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Banner Section */}
            <div className="relative w-full h-[600px] overflow-hidden">
                {slides.map((slide, index) => (
                    <img
                        src={slide}
                        key={index}
                        className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
                            index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                        alt={`Slide ${index + 1}`}
                    />
                ))}

                {/* Left Arrow Button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length)}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full"
                >
                    <ChevronLeftIcon className='w-6 h-6 text-gray-800' />
                </Button>

                {/* Right Arrow Button */}
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length)}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/50 hover:bg-white rounded-full"
                >
                    <ChevronRightIcon className='w-6 h-6 text-gray-800' />
                </Button>
            </div>

            {/* Shop by Category Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {categoriesWithIcon.map((item) => (
                            <Card key={item.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {item.icon && <item.icon className="w-12 h-12 mb-4 text-primary" />}
                                    <span className='font-bold'>{item.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Shop by Brand Section */}
            <section className="py-12 bg-gray-50">
                <div className="container mx-auto px-4">
                    <h2 className='text-3xl font-bold text-center mb-8'>Shop by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {brandsWithIcon.map((branditem) => (
                            <Card key={branditem.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                                <CardContent className="flex flex-col items-center justify-center p-6">
                                    {branditem.icon && <branditem.icon className="w-12 h-12 mb-4 text-primary" />}
                                    <span className='font-bold'>{branditem.label}</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12">
            <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productList && productList.length > 0
              ? productList.map((productItem) => <ShoppingProductTile product={productItem}/>)
              : null}
            </div>  
            </div>
            </section>
        </div>
    );
};

export default ShoppingHome;
