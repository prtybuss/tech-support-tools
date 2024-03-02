const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/appError");
const bcrypt = require('bcrypt');

const userSchema = require('../models/users');
const officeSchema = require('../models/offices');
const db = require('../models/conn');
const User = db.model("user", userSchema);
const Office = db.model("office", officeSchema);


const createToken = id => {
  return jwt.sign(
    {
      id,
    },
    process.env.API_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    },
  );
};

exports.signin = async (req, res, next) => {
  console.log('login \n req.body', req.body);
  try {
    const { login, password } = req.body;
console.log('login',login,'password:;:',password);
    if (!login || !password) {
      return next(new AppError(404, "fail", "Please provide login or password"),
        req, res, next,);
    }

    // 2) check if user exist and password is correct
    const user = await User.findOne({ login, })/* .select("+password") */;

    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    console.log('passwordIsValid:', passwordIsValid);

    if (!user || !(await passwordIsValid)) {
      return next(
        new AppError(401, "fail", "login or Password is wrong"),
        req,
        res,
        next,
      );
    }

    // 3) All correct, send jwt to client
    const token = createToken(user.id);

    // Remove the password from the output
    user.password = undefined;

    res.status(200).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.signup = async (req, res, next) => {
  console.log('SIGN UP \n req.body', req.body);
  const office = await Office.findOne({ numb: req.body.office });
    try {
    const user = await User.create({
      login: req.body.login,
      role: req.body.role,
      password: bcrypt.hashSync(req.body.password, 8),
      office: office.id
    });

    const token = createToken(user.id);

    /* user.password = undefined; */

    res.status(201).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  } catch (err) {
    next(err);
  }
};

exports.protect = async (req, res, next) => {
  try {
    // 1) check if the token is there
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError(
          401,
          "fail",
          "You are not logged in! Please login in to continue",
        ),
        req,
        res,
        next,
      );
    }

    // 2) Verify token
    const decode = await promisify(jwt.verify)(token, process.env.API_SECRET);

    // 3) check if the user is exist (not deleted)
    const user = await User.findById(decode.id);
    if (!user) {
      return next(
        new AppError(401, "fail", "This user is no longer exist"),
        req,
        res,
        next,
      );
    }

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

// Authorization check if the user have rights to do this action
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(403, "fail", "You are not allowed to do this action"),
        req,
        res,
        next,
      );
    }
    next();
  };
};