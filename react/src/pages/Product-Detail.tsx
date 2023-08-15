import { useParams } from "react-router-dom";
import { useGetProductByIdQuery } from "../api/product";

export default function ProductDetail() {

    const { idProduct } = useParams<{ idProduct: string }>();
    const { data: productData, isLoading } = useGetProductByIdQuery(idProduct || "");
    const product = productData
    return (
        <div className="" >
            <div className="pt-6">
                <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <img src={product?.image} />
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Name: {product?.name}</h1>
                        <p className="text-3xl tracking-tight text-gray-900">Price: {product?.price}</p>
                        <form className="mt-10">
                            <div>
                                <h3 className="sr-only">Description</h3>
                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">Chi Tiết: {product?.description}</p>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add to car
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}