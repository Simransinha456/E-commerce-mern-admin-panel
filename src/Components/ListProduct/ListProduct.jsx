import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/cross_icon.png";

const ListProduct = () => {
  //Logic to fetch the data from api
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch('http://localhost:8000/newproduct/allproduct') //using this fetch request we are getting response
      .then((res) => res.json()) //convert it into json
      .then((data) => {
        setAllProducts(data)}); // save data it in All Products variable
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  //for cross_icon removing product on clicking
  const remove_product = async (id) =>{
    await fetch("http://localhost:8000/newproduct/removeproduct",{
      method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id:id}),
      })  
      await fetchInfo();
    }
    


  return (
    <div className="list-product">
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allproducts.map((product, index) => {
          return (
            <>
            <div
              key={index}
              className="listproduct-format-main listproduct-format">
              <img
                src={product.image}
                className="listproduct-product-icon"/>
              <p>{product.name}</p>
              <p>Rs {product.old_price}</p>
              <p>Rs {product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className="listproduct-remove-icon" src={cross_icon} />
            </div>
            <hr />
            </>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
