const User = require("../models/User");


const getAllUsers = async (req, res) => {
  try {
      
    const allUser = await User.find();
    
  
    return res.status(200).json({
      success: true,
      message: "User get successfully",
      data: {
        user: allUser,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User get failed",
      error: error.message,
    });
  }
};




module.exports = {
  getAllUsers,
};