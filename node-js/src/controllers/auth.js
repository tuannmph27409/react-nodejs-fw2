import Users from "../models/user";
import bcrypt from 'bcryptjs'
import dotennv from 'dotenv'
import  jwt  from "jsonwebtoken";
import { signinSchema, signupSchema } from "../schemas/auth";
dotennv.config();

const {SECRET_CODE} = process.env;

export const signup = async ( req , res) =>{
    try {
        const {error}= signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }     
        const{name , email, password} = req.body;

        const findEmail = await Users.findOne({ email });
    if (findEmail) {
      return res.status(400).json({
        message: "Email này đã được đăng ký!",
      });
    }

        const passwordhash =await bcrypt.hash(password ,10);
        const user = await Users.create({
            name,
            email,
            password:passwordhash,
        });
        user.password = undefined

        return res.status(200).json({
            message: "dang ky thanh cong",
            data : user,
        });

    } catch (error) {
        return res.status(500).json({
            message: "loi",
          });
    }
};

export const signin = async (req, res) => {
  try {
    const { error } = signinSchema.validate(req.body);
    console.log(error);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }

    const { email, password } = req.body;
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Tai khoan khong ton tai!",
      });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Mat khau khong dung!",
        
      });
    
      
    }

    const token = jwt.sign({ id: user._id }, SECRET_CODE, {
      expiresIn: "3d",
    });

    user.password = undefined;
    return res.status(200).json({
      message: "Dang nhap thanh cong!",
      accessToken: token,
      user,
    });

    // bcrypt.compare("B4c0//", hash, function (err, res) {
    //   // res === true
    // });
  } catch (error) {
    return res.status(500).json({
      message: "loi server",
    });
  }
};


