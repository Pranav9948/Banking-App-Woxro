const User = require("../Models/userModel");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  console.log("backend reached");
  try {
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res
        .status(200)
        .json({ message: "user already exists", success: false });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();
    res
      .status(200)
      .send({
        message: "user created successfully",
        success: true,
        user: newUser,
      });
  } catch (error) {
    res
      .status(500)
      .send({ message: "error creating user", success: false, error });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res
        .status(200)
        .send({ message: "user does not exist", success: false });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res
        .status(200)
        .send({ message: "invalid password", success: false });
    } else {
      
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5d",
          });
          
    
      res.status(200).send({
        message: "user logged in successfully",
        success: true,
        data: token,
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "error loggin in", success: false, error });
  }
};

const getUserInfoById = async (req, res) => {
  console.log("reached..");
  try {
    const user = await User.findOne({ _id: req.userId });
    user.password = undefined;
    if (!user) {
      res.status(200).send({ message: "user does not exist", success: false });
    } else {
      res.status(200).send({
        message: "user info",
        success: true,
        data: user,
      });
    }
  } catch (error) {
    res
      .status(500)
      .send({ message: "error getting user info", success: false, error });
  }
};

const depositAmount = async (req, res) => {
  console.log("reached..");
  try {
    console.log("123", req.body.userInfo);
    const user = await User.findOne({ _id: req.body.userInfo});
    console.log("user", user);
    
    user.balance = (user.balance + Number(req.body.depositAmount));
    console.log("124", user.balance);
    
    

    const timestamp = Date.now();
    const dateObj = new Date(timestamp);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "IST",
    };
    const formattedDate = dateObj.toLocaleString("en-US", options);
    console.log("date", formattedDate);

    user.bankStatements.push({
      type: "Credit",
      dateTime: formattedDate,
      amount: req.body.depositAmount,
      Details: "Deposit",
      Balance: user.balance,
    });

    await user.save();

    res.status(200).send({
        message: "deposit added successfully",
        success: true,
        data: user,
      });

  } catch (error) {
    console.log("123", error);
    res
      .status(500)
      .send({ message: "error adding deposit ", success: false, error });
  }
};


const getUserById = async (req, res) => {
    console.log("reached..");
    
    try {
      const user = await User.findOne({ _id: req.body.USERID});
      user.password = undefined;
      if (!user) {
        res.status(200).send({ message: "user does not exist", success: false });
      } else {
        res.status(200).send({
          message: "user info",
          success: true,
          data: user,
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "error getting user info", success: false, error });
    }
  };


   const getUserStatements = async (req, res) => {
    console.log("reached..");
    
    try {
      const user = await User.findOne({ _id: req.body.USERID});
     
      if (!user) {
        res.status(200).send({ message: "user does not exist", success: false });
      } else {


         const statements= await user.bankStatements




        res.status(200).send({
          message: "user statements fetched",
          success: true,
          data: user,
        statements:statements
        });
      }
    } catch (error) {
      res
        .status(500)
        .send({ message: "error getting user info", success: false, error });
    }
  }; 


  const withDrawAmount = async (req, res) => {
    console.log("reached..");
    try {
      console.log("123", req.body.userInfo);
      const user = await User.findOne({ _id: req.body.userInfo});
      console.log("user", user);
      
      user.balance = (user.balance - Number(req.body.withdrawAmount));
      console.log("124", user.balance);
      
      
  
      const timestamp = Date.now();
      const dateObj = new Date(timestamp);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "IST",
      };
      const formattedDate = dateObj.toLocaleString("en-US", options);
      console.log("date", formattedDate);
  
      user.bankStatements.push({
        type: "Debit",
        dateTime: formattedDate,
        amount: req.body.withdrawAmount,
        Details: "Withdraw",
        Balance: user.balance,
      });
  
      await user.save();
  
      res.status(200).send({
          message: "withdrawed  successfully",
          success: true,
          data: user,
        });
  
    } catch (error) {
      console.log("123", error);
      res
        .status(500)
        .send({ message: "error withdrawing ", success: false, error });
    }
  };



  const transferAmount = async (req, res) => {
    console.log("reached..");
    try {
      console.log("123", req.body.userInfo);
      const user = await User.findOne({ _id: req.body.userInfo});
      console.log("user", user);
      
      user.balance = (user.balance - Number(req.body.transferAmount));
      console.log("124", user.balance);
      
      
  
      const timestamp = Date.now();
      const dateObj = new Date(timestamp);
      const options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "IST",
      };
      const formattedDate = dateObj.toLocaleString("en-US", options);
      console.log("date", formattedDate);
  
      user.bankStatements.push({
        type: "Debit",
        dateTime: formattedDate,
        amount: req.body.transferAmount,
        Details: `Transfer to ${req.body.email}`,
        Balance: user.balance,
        
      });
  
      await user.save();
  
      res.status(200).send({
          message: "Transfered  successfully",
          success: true,
          data: user,
        });
  
    } catch (error) {
      console.log("123", error);
      res
        .status(500)
        .send({ message: "error withdrawing ", success: false, error });
    }
  };








module.exports = {
  register,
  login,
  getUserInfoById,
  depositAmount,
  getUserById,
  getUserStatements,
  withDrawAmount,
  transferAmount
};
