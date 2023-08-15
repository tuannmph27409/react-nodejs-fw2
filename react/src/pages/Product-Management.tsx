import { Button, Skeleton, Table, Popconfirm, } from "antd";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGetProductsQuery, useRemoveProductMutation } from "../api/product";
import Search from "antd/es/transfer/search";

const ProductManagement = () => {
    const { data, error, isLoading } = useGetProductsQuery();
    const [removeProduct, { isLoading: isRemoveLoading }] = useRemoveProductMutation();
    if (isLoading) return <Skeleton />;
    if (error) return <div>Error</div>;
    const dataSource = data?.map(({ _id, name, price, image, description }: any) => {
        return {
            key: _id,
            name,
            price,
            image,
            description
        };
    });
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Image",
            // dataIndex: "image",
            key: "image",
            render: (image: any) => <div><img src={image.image} /></div>
        },
        {
            title: "Desc",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Action",
            key: "action",
            render: ({ key: _id }: any) => {
                return (
                    <>
                        <Popconfirm
                            placement="topLeft"
                            title={"Are you fucking sure?"}
                            onConfirm={() => confirm(_id)}
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button className="bg-blue-500 text-white">
                                {isRemoveLoading ? (
                                    <AiOutlineLoading3Quarters className="animate-spin" />
                                ) : (
                                    "Delete"
                                )}
                            </Button>
                        </Popconfirm>
                        <Button className="ml-2 bg-red-500 text-white">
                            <Link to={`/admin/product/${_id}/edit`}>Edit</Link>
                        </Button>
                    </>
                );
            },
        },
    ];
    const confirm = (_id: any) => {
        removeProduct(_id);
    };
    return (
        <div className="max-w-4xl mx-auto">
            <div className="w-96">
                <Search placeholder="input search text" onSearch={Search} />
            </div>
            <br />
            <br />
            <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-2xl">Quản lý Sản phẩm</h2>
                <Button className="bg-green-500 text-white" >
                    <Link to="/admin/product/add">Thêm sản phẩm</Link>
                </Button>
            </div>

            <Table dataSource={dataSource} columns={columns} />
        </div>
    );
};

export default ProductManagement;