import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
 
export const getUsers = async(req, res) => {
    try {
        const users = await Users.findAll({
            attributes:['username','name','email']
        });
        res.json(users);
    } catch (error) {
        console.log(error);
    }
}
 
export const Register = async(req, res) => {
    const { username, name, email, password, confPassword,role } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password do not match"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await Users.create({
            username : username,
            name: name,
            email: email,
            password: hashPassword,
            role : role
        });
        res.json({msg: "Registration Successful"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async (req, res) => {
    try {
      const user = await Users.findOne({
        where: {
          username: req.body.username,
        },
      });
  
      if (!user) {
        return res.status(404).json({ rc: "01", msg: "Username not found" });
      }
  
      const match = await bcrypt.compare(req.body.password, user.password);
      if (!match) return res.status(400).json({ rc: "02", msg: "Wrong Password" });
  
      const username = user.username;
      const name = user.name;
      const email = user.email;
      const role = user.role;
  
      // Customize token payload based on user role
      let tokenPayload = { username, name, email, role };
  
      const accessToken = jwt.sign(tokenPayload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '15s',
      });
  
      res.json({ rc: "00", msg: "Login successful", accessToken });
    } catch (error) {
      console.error(error);
      res.status(500).json({ rc: "99", msg: "Internal Server Error" });
    }
  };

 
export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await Users.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const username = user[0].username;
    await Users.update({refresh_token: null},{
        where:{
            username: username
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}