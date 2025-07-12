import { compare } from 'bcryptjs';
import User from '../models/User.js';
import pkg from 'jsonwebtoken';
const { sign } = pkg;

export async function register(req, res) {
  const { name, phone, password } = req.body;

  if(!name || !phone || !password){
    console.log("Missing fields")
    return res.json({ success : false})
  }
  try {

    const checkUser = await User.findOne({phone});
    if(checkUser){
      return res.json({ message : "Already register"});
    }

    const user = await User.create({ name, phone, password });
    const token = sign({ id: user._id,  role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ 
      token, 
      success : true, 
      message: "Welcome to the site" ,
      userId : user._id
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
}

export async function login(req, res) {
  const { phone, password } = req.body;
  try {
    const user = await User.findOne({ phone });
    if (!user) return res.json({ 
      message : "User not found",
      success: false
    });

      const isMatch = password === user.password ? true : false;
    if (!isMatch) {
      return res.status(401).json({ 
        message: "Invalid credentials",
        success: false
      });
    }
    if(user.isBlocked){
      return res.status(401).json({ 
        message: "User is blocked",
        success: false
      });
    }
    const token = sign({ id: user._id,  role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token ,
       userId : user._id,
       success : true,
       message : "Welcome to the site"
      });
  } catch (error) {
    res.status(400).json({ 
      message: error,
      success : false
    });
  }
}

export  const fecthUsers = async(req, res)=>{
   try{
      const users = await User.find();
      if(users){
        res.status(200).json(users);
      }
      else{
         res.status(400).json({
       success: false
    });
      }
   }
   catch(err){
    res.status(400).json({
       success: false
    })
   }
}

export const updateBlock = async(req, res)=>{
  const { userId, actionName } = req.body;

  if(!userId){
    return res.status(500).json({
      message : "Missing feilds",
      success: false
    })
  }
  try{
    const user = await User.findOneAndUpdate({ _id : userId},{
      isBlocked : actionName
    }).exec();

    if(!user){
      return console.log("user not found");
    }

    res.status(200).json({
      success: true,
      user,
      message : "Task completed"
    })
  }
  catch(err){
     return res.status(400).json({
      message : err,
      success: false
    })
  }
}

export const checkAdmin = (req, res, next) =>{
  res.status(200).json({
    message: 'Only admins see this.',
    success: true
  })
}
