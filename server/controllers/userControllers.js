import bcrypt from 'bcrypt';
import { User, validate } from '../model/users';

export const register = async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ message: error.details[0].message });
    }
    // checking if any other user with same email exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res
        .status(409)
        .send({ message: 'User with given email already exists' });
    }

    // checking if any other user with same email exists
    const username = await User.findOne({ email: req.body.username });
    if (username) {
      return res.status(409).send({ message: 'User name already taken' });
    }

    // if all ok create new user

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();

    res.status(201).send({ message: 'User created success' });
  } catch (err) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

export const login = async (req, res) => {
  try {
    const { error } = verifyUser(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(401).send({ message: 'Invalid Email or Password' });

    const token = user.generateAuthToken();
    res.status(200).send({ data: token, message: 'logged in successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// user email , password
const verifyUser = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label('Email'),
    password: Joi.string().required().label('Password'),
  });
  return schema.validate(data);
};
