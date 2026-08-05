import mongoose from 'mongoose';

const testimonialSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, 'Full Name is required'],
      trim: true,
      maxlength: [100, 'Full Name cannot exceed 100 characters']
    },
    company: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Company name cannot exceed 100 characters']
    },
    designation: {
      type: String,
      trim: true,
      default: '',
      maxlength: [100, 'Designation cannot exceed 100 characters']
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating cannot be more than 5']
    },
    reviewMessage: {
      type: String,
      required: [true, 'Review message is required'],
      trim: true,
      maxlength: [2000, 'Review message cannot exceed 2000 characters']
    },
    profileImage: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: {
        values: ['pending', 'approved', 'rejected'],
        message: 'Status must be pending, approved, or rejected'
      },
      default: 'pending',
      index: true
    },
    reviewedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Compound index for quick querying of approved testimonials
testimonialSchema.index({ status: 1, createdAt: -1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

export default Testimonial;
