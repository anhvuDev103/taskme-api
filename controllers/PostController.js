const Task = require('../models/Task');

const TaskController = {
  // Add
  add: async (req, res) => {
    try {
      const newTask = await new Task({
        ...req.body,
      });
      console.log('add: ~ newTask', newTask);
      newTask
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            message: 'Tạo Task thành công!',
          });
        })
        .catch((error) => {
          return res.status(400).json({
            success: false,
            message: 'Có trục trặc trong quá trình tạo Task, vui lòng thử lại sau\nError: ' + error,
          });
        });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Có lỗi xảy ra trong quá trình đăng ký, vui lòng thử lại sau!',
      });
    }
  },
};

module.exports = TaskController;
