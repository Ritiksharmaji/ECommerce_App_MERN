const Product = require("../../models/Product");

const getFilteredProducts = async (req, res) => {
  try {
    const { category = [], brand = [], sortBy = "price-lowtohigh" } = req.query;

    // here category and brand are the query parameters that are passed in the URL to filter the products based on the category and brand.
    // and this  both may and may not be present in the URL. If they are not present in the URL, then the default value of the category and brand will be an empty array.
    // and the default value of the sortBy will be price-lowtohigh.
    // the category and brand are some thing more than one or one also based on user selection that why we are using the array to store the values.

    // here filters is an object that will be used to filter the products based on the query parameters passed in the URL beause 
    // the query parameters are passed as an array of strings, we need to convert them into an array of objects to use them in the
    // find method of the Product model. We will use the $in operator to filter the products based on the category and brand.
    // The $in operator selects the documents where the value of a field equals any value in the specified array.
    //
    let filters = {};

    if (category.length) {
      filters.category = { $in: category.split(",") };
    }

    if (brand.length) {
      filters.brand = { $in: brand.split(",") };
    }

    let sort = {};

    switch (sortBy) {
      case "price-lowtohigh":
        sort.price = 1;

        break;
      case "price-hightolow":
        sort.price = -1;

        break;
      case "title-atoz":
        sort.title = 1;

        break;

      case "title-ztoa":
        sort.title = -1;

        break;

      default:
        sort.price = 1;
        break;
    }

    const products = await Product.find(filters).sort(sort);
   // const products = await Product.find({});

    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found!",
      });

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (e) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured",
    });
  }
};

module.exports = { getFilteredProducts, getProductDetails };