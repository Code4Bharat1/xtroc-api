import Testimonial from './testimonial.model.js';
import ApiError from '../../utils/apiError.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import logger from '../../utils/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TestimonialService {
  /**
   * Submit a new testimonial (Public visitor)
   * Always saved with status = 'pending'
   */
  async createTestimonial(data, file) {
    let profileImageUrl = '';
    if (file) {
      profileImageUrl = `/uploads/avatars/${file.filename}`;
    }

    const testimonial = await Testimonial.create({
      fullName: data.fullName,
      company: data.company || '',
      designation: data.designation || '',
      rating: Number(data.rating),
      reviewMessage: data.reviewMessage,
      profileImage: profileImageUrl,
      status: 'pending'
    });

    return testimonial;
  }

  /**
   * Get public approved testimonials
   */
  async getPublicApprovedTestimonials() {
    return await Testimonial.find({ status: 'approved' })
      .select('-__v')
      .sort({ createdAt: -1 });
  }

  /**
   * Get all testimonials for Admin Dashboard with optional status filtering & pagination
   */
  async getAdminTestimonials(query = {}) {
    const { status, page = 1, limit = 20 } = query;
    const filter = {};

    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      filter.status = status;
    }

    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 20;
    const skip = (pageNum - 1) * limitNum;

    const testimonials = await Testimonial.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Testimonial.countDocuments(filter);
    const totalPending = await Testimonial.countDocuments({ status: 'pending' });
    const totalApproved = await Testimonial.countDocuments({ status: 'approved' });
    const totalRejected = await Testimonial.countDocuments({ status: 'rejected' });

    return {
      testimonials,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum)
      },
      counts: {
        total,
        pending: totalPending,
        approved: totalApproved,
        rejected: totalRejected
      }
    };
  }

  /**
   * Update Testimonial Status (Approve / Reject)
   */
  async updateStatus(id, status) {
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      throw new ApiError(400, 'Invalid status. Status must be pending, approved, or rejected.');
    }

    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found.');
    }

    testimonial.status = status;
    testimonial.reviewedAt = new Date();
    await testimonial.save();

    return testimonial;
  }

  /**
   * Update Testimonial Details (Admin)
   */
  async updateTestimonial(id, data, file) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found.');
    }

    if (file) {
      // Remove old image if existed locally
      if (testimonial.profileImage) {
        this.deleteLocalFile(testimonial.profileImage);
      }
      testimonial.profileImage = `/uploads/avatars/${file.filename}`;
    }

    if (data.fullName !== undefined) testimonial.fullName = data.fullName;
    if (data.company !== undefined) testimonial.company = data.company;
    if (data.designation !== undefined) testimonial.designation = data.designation;
    if (data.rating !== undefined) testimonial.rating = Number(data.rating);
    if (data.reviewMessage !== undefined) testimonial.reviewMessage = data.reviewMessage;
    if (data.status !== undefined && ['pending', 'approved', 'rejected'].includes(data.status)) {
      testimonial.status = data.status;
      testimonial.reviewedAt = new Date();
    }

    await testimonial.save();
    return testimonial;
  }

  /**
   * Delete Testimonial (Admin)
   */
  async deleteTestimonial(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new ApiError(404, 'Testimonial not found.');
    }

    if (testimonial.profileImage) {
      this.deleteLocalFile(testimonial.profileImage);
    }

    await Testimonial.findByIdAndDelete(id);
    return { id };
  }

  /**
   * Helper to delete local avatar image
   */
  deleteLocalFile(relativePath) {
    try {
      const filename = path.basename(relativePath);
      const filePath = path.join(__dirname, '../../../uploads/avatars', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      logger.warn(`Could not delete avatar file ${relativePath}: ${error.message}`);
    }
  }
}

export default new TestimonialService();
