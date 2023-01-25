import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import Joi from 'joi';
const passwordComplexity = require('joi-password-complexity');

const userSchema = new mongoose.Schema({
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

userSchema.method.generateAuthToken = () => {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: '10d',
  });
  return token;
};

export const User = mongoose.model('User', userSchema);

export const validate = (data) => {
  const Schema = Joi.object({
    firstName: Joi.string().required().label('First Name'),
    lastName: Joi.string().required().label('Last Name'),
    email: Joi.string().required().label('Email'),
    password: passwordComplexity().required().label('Password'),
  });
  return Schema.validate(data);
};
