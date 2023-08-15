
import dotennv from "dotenv";
import Joi from "joi";
import Category from "../models/category.js";
import Product from "../models/product.js";
import { productSchema } from "../schemas/product.js";
dotennv.config();


export const getAll = async (req, res) => {
  try {
    // const {data:products} = await axios.get(`http://localhost:3001/products`);
    const products = await Product.find().populate("categoryId");
    if (products.length === 0) {
      res.send({
        messenger: "danh sach trong!"
      })
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};


export const getDetail = async (req, res) => {
  try {
    // const { data: product } = await axios.get(
    //   `${process.env.API_URI}/${req.params.id}`
    // );
    const product = await Product.findById(req.params.id).populate("categoryId")

    if (!product) {
      res.send({
        messenger: "Sản phẩm không tồn tại",
      });
    }
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).send({
      messenger: error,
    });
  }
};

export const create = async (req, res) => {
  try {
    // const value  = await productSchema.validateAsync(req.body);
    // console.log(value);
    // const { data: product } = await axios.post(
    //   `${process.env.API_URI}/products/`,
    //   req.body
    // );
    // if (!product) {
    //   res.send({
    //     messenger: "Thêm sản phẩm thất bại",
    //   });
    // }
    const { error } = productSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const product = await Product.create(req.body)
    await Category.findByIdAndUpdate(product.categoryId, {
      $addToSet: {
        product: product._id,
      },
    })
    if (!product) {
      return res.status(400).json({
        messenger: " Khong the them san pham"
      })
    }
    return res.status(200).json({
      messenger: "them san pham thanh cong",
      data: product,
    });
  } catch (error) {
    res.status(500).send({
      messenger: "loi r ",
    });
  }
};

export const update = async (req, res) => {
  try {
    // const { data: product } = await axios.put(
    //   `${process.env.API_URI}/${req.params.id}`,
    //   req.body
    // );
    const { error } = productSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const products = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!products) {
      console.log("hehe");
      res.send({
        messenger: "Cập nhật sản phẩm thất bại",

      });
    }
    return res.status(200).json({
      messenger: " cap nhap thanh cong ",
      data: products

    });
  } catch (error) {
    res.status(500).send({
      messenger: error,
    });
  }
};

export const remove = async (req, res) => {
  try {
    // await axios.delete(`${process.env.API_URI}/${req.params.id}`);
    const products = await Product.findByIdAndDelete(req.params.id)
    if (products) {
      return res.status(203).send({
        messenger: "Xoá sản phẩm thành công!",
      });
    }

  } catch (error) {
    res.send({
      messenger: error,
    });
  }
};

