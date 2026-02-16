const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: {
      values: ['All', 'Personal', 'Work', 'Shopping', 'Health', 'Learning'],
      message: '{VALUE} is not a valid category'
    },
    default: 'Personal'
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required'],
    default: Date.now
  },
  priority: {
    type: String,
    required: [true, 'Priority is required'],
    enum: {
      values: ['low', 'med', 'high'],
      message: '{VALUE} is not a valid priority'
    },
    default: 'med'
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt fields
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
