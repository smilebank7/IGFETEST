import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

export default mongoose.models.admins || mongoose.model('admins', AdminSchema); 