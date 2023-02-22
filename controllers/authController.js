const bcrypt = require('bcrypt');
const User = require('../models/User');

const authController = {
  // Register
  register: async (req, res) => {
    try {
      const { fullname, username, email, password } = req.body;

      if (!fullname || !username || !email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Thiếu thông tin người dùng, vui lòng điền đầy đủ thông tin!',
        });
      }

      const user = await User.findOne({ $or: [{ username }, { email }] });
      console.log('register: ~ user', user);
      if (user) {
        const fieldsHasExisted = user.username === username ? 'Username' : 'Email';
        return res.status(400).json({
          success: false,
          message: `${fieldsHasExisted} đã được đăng ký, vui lòng sử dụng ${fieldsHasExisted.toLowerCase()} khác!`,
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = await new User({
        fullname,
        username,
        email,
        password: hashedPassword,
      });

      // Save to DB
      newUser
        .save()
        .then(() =>
          res.status(200).json({
            success: true,
            message: 'Đăng ký tài khoản thành công!',
          })
        )
        .catch((err) => {
          res.status(405).json({
            success: false,
            message: 'Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại sau!\nLỗi: ' + err,
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại sau!',
      });
    }
  },

  // Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(405).json({
          success: false,
          message: 'Thiếu thông tin người dùng, vui lòng điền đầy đủ thông tin!',
        });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(405).json({
          success: false,
          message: 'Sai địa chỉ email, vui lòng kiểm tra lại!',
        });
      }
      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(405).json({
          success: false,
          message: 'Sai mật khẩu, vui lòng kiểm tra lại!',
        });
      }

      // OK
      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công!',
      });
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: 'Đăng nhập thất bại, vui lòng thử lại!',
      });
    }
  },
};

module.exports = authController;
