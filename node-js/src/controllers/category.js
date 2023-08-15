
import Category from "../models/category";

export const getAll = async (req ,res) =>{
    try {
        const categories = await Category.find();
        if(categories.length === 0){
            res.status(300).send({
                messenger: "Danh sách category trống",
            });
        }
        return res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({
            messenger:"lỗi!",
            datas:[]
        })
    }
    
};

export const create = async (req, res) =>{
    try {

        const category = await Category.create(req.body);
        if(!category){
            res.send({
                messenger:"Thêm category KHÔNG thành công"
            });
            return res.json({
                messenger: "Thêm thành công !",
                data: category
            })
        }
        
    } catch (error) {
        res.status(500).json({
            messenger:" lỗi",
            datas:[]
        })
    }
};

export const remove = async (req , res) =>{
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            messenger:"Đã xóa sản phẩm thành công!",
            data: category
        })
    } catch (error) {
        req.status(500).json({
            messenger: "lỗi",
            datas:[]
        })
    }
};

export const update = async (req, res) =>{
    try {
        const category = await Category.findByIdAndUpdate(req.params.id,req.body);
        if(!category){
            res.send({
                messenger:"Update không thành công"
            });
        }
        return res.status(201).json({
            messenger:"Update thành công",
            data: Category,
            data: category
        })
    } catch (error) {
        req.status(500).json({
            messenger:"Lỗi",
            datas:[]
        })
    }
}