const userModel = require("../Models/userModel");
const bcrypt = require("bcrypt");
// const validator = require("validator");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;
    return jwt.sign({_id}, jwtkey, {expiresIn: "3d"});
};

const verifyToken = (req, res, next) => {
    console.log(process.env.JWT_SECRET_KEY);
    console.log("hello thtere");
    const jwtkey = process.env.JWT_SECRET_KEY;
    const authHeader = req.headers.authorization;
    if (authHeader) {
        jwt.verify(authHeader, jwtkey, (err) => {
            if (err) {
            return res.status(401).json({message:"invalid token"});
            }
            next();
        });
        } else {
        return res.status(401).json({message :"token is missing"});
        }
};
const changeStatus = async(req,res)=>{
    const {userId,status} = req.body;
    try{
    await userModel.findOneAndUpdate({_id : userId},{status:status});
    return res.status(200).json({message:"Status changes Successfully"});
    }
    catch(e){
        return res.status(401).json({message : "something went wrong"});
    }
}
const registerUser = async (req, res) => {
    try{
        const { name, email, password } = req.body;
        let user = await userModel.findOne({ email });

        if(user) return res.status(400).json("User with given email already exists.");
        if(!name || !email || !password) return res.status(400).json("All fields are required.");
        // if(!validator.isEmail(email)) return res.status(400).json("Email must be a valid email.");
        // if(!validator.isStrongPassword(password)) return res.status(400).json("Password must be a strong password.");
        user = new userModel({ name, email, password });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password,salt);
        await user.save();
        const token = createToken (user._id);
        res.status(200).json({_id: user._id, name, email, token});
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const loginUser = async(req,res) =>{
    const{ email, password } = req.body;
    try{ 
        let user = await userModel.findOne({ email });
        if(!user) return res.status(400).json("Invalid email or password.");
        
        const isValidPassword = await bcrypt.compare(password, user.password);
       
        if(!isValidPassword) return res.status(400).json("Invalid email or password.");
        
        const token = createToken(user._id);
        res.status(200).json({_id: user._id, name: user.name, email, token,status:user.status});
        
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const findUser = async(req, res) =>{
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);

        res.status(200).json(user);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

const getUsers = async(req, res) =>{
    try{
        const users = await userModel.find();

        res.status(200).json(users);
    }catch(error){
        console.log(error);
        res.status(500).json(error);
    }
};

module.exports = { registerUser, loginUser, findUser, getUsers ,verifyToken,changeStatus};