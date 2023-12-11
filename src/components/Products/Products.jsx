import React, { useEffect } from "react";
import { getAll, like } from "../../features/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";

const Products = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getAll());
  }, []);

  if (products.length <= 0) {
    return "Cargando productos...";
  }
  const product = products.map((product) => {
    const isAlreadyLiked = product.likes.includes(user._id);
    return (
      <div key={product._id}>
        <h2>{product.name}</h2>
        <p>{product.price} €</p>
        {product.likes.length}
        {isAlreadyLiked ? <HeartFilled onClick={()=>console.log("unlike")}/> : <HeartOutlined onClick={()=>dispatch(like(product._id))}/>}
      </div>
    );
  });
  return <div>{product}</div>;
};

export default Products;
