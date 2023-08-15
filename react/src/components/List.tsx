import { Link } from "react-router-dom";
import { useAddProductMutation, useGetProductsQuery } from "../api/product";
import { useAppDispatch } from "../app/hooks";

const List = () => {
    const dispatch = useAppDispatch();
    const { data: products, error, isLoading } = useGetProductsQuery();
    const [ahihi] = useAddProductMutation();
    return (
        <div className="listProduct">
            {products?.map((item: any) => {
                return (
                    <div className="ItemProduct" key={item._Id}>
                        name: {item.name}
                        <br />
                        price:{item.price}
                        <br />
                        desc: {item.description}
                        <br />
                        desc: <img src={item.image} />
                        <br />
                        <button
                            // onClick={() => dispatch(add({ ...item, quantity: 1 }))}
                            className="bg-blue-500 text-white p-2"
                        >
                            Add to cart
                        </button>
                        <Link to={`product-detail/${item._id}`}>
                            chi tiet
                        </Link>


                    </div>
                );
            })}

        </div>
    );
};

export default List;