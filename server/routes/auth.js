console.log("auth route loaded");
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {sendResetEmail} = require("../services/emailService");
const User = require("../models/User");
console.log("forgot passoword apihit");

const router = express.Router();
router.post("/register", async(req,res)=>{

    try {

        const {name,email,phone,password} = req.body;


        const existUser = await User.findOne({
            $or:[
                {email},
                {phone}
            ]
        });


        if(existUser){
            return res.status(400).json({
                success:false,
                message:"Account already exists"
            });
        }


        const hashPassword = await bcrypt.hash(password,10);


        const user = await User.create({

            name,
            email,
            phone,
            password:hashPassword

        });


        res.status(201).json({

            success:true,
            message:"Account Created Successfully",
            user

        });


    }
    catch(err){

        console.log(err);

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});
router.post("/login", async(req,res)=>{

    try{

        const {email,phone,password} = req.body;


        const user = await User.findOne({

            $or:[
                {email},
                {phone}
            ]

        });


        if(!user){

            return res.status(404).json({

                success:false,
                message:"Account not found"

            });

        }



        const matchPassword = await bcrypt.compare(
            password,
            user.password
        );


        if(!matchPassword){

            return res.status(400).json({

                success:false,
                message:"Wrong Password"

            });

        }



        res.status(200).json({

            success:true,
            message:"Login Successful",
            user

        });


    }
    catch(err){

        console.log(err);

        res.status(500).json({
            success:false,
            message:err.message
        });

    }

});
router.post("/forgot-password", async (req, res) => {
    console.log("forgot password apihit");
    console.log("body:",req.body);
  try {
    const { email } = req.body;
    console.log("email:",email);

    const user = await User.findOne({ email });
    console.log("user found:",user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    console.log("before token");

    const token = jwt.sign(
      { id: user._id },
      "veggiehub_secret",
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    console.log("before email send");
     console.log("user found:",user.email);
     console.log("reset link:",resetLink);
    await sendResetEmail(user.email, resetLink);

    res.json({
      success: true,
      message: "Password reset email sent successfully",
    });

  } catch (err) {
    console.log("forgot error:",err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

router.post("/reset-password/:token",async (req,res)=> {
    try{
        const {token}=req.params;
        const {password}=req.body;
        const decoded = jwt.verify(token,"veggiehub_secret");
        const hashPassword =await bcrypt.hash(password,10);
        await User.findByIdAndUpdate(decoded.id,
        {
            password:hashPassword
        }
    );
    const updateUser =await User.findById(decoded.id);
    console.log("updated password:",updateUser.password);

    res.json({
        success:true,
        message:"Password reset successfully"
    });
    }

    catch(err){
        console.log(err);
        res.status(400).json({
            success:false,
            message:"Invalid or expired link"
        });
    }
});

module.exports = router;