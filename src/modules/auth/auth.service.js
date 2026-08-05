import jwt from 'jsonwebtoken';
import Admin from './auth.model.js';
import ApiError from '../../utils/apiError.js';
import envConfig from '../../config/env.config.js';

class AuthService {
  /**
   * Authenticate admin credentials and generate JWT token
   * @param {string} email
   * @param {string} password
   * @returns {Object} { admin, token }
   */
  async loginAdmin(email, password) {
    const admin = await Admin.findOne({ email: email.toLowerCase() }).select('+password');

    if (!admin) {
      throw new ApiError(401, 'Invalid email or password credentials.');
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      throw new ApiError(401, 'Invalid email or password credentials.');
    }

    const token = this.generateToken(admin._id);

    const adminResponse = {
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      createdAt: admin.createdAt
    };

    return { admin: adminResponse, token };
  }

  /**
   * Generate JWT Token for user ID
   * @param {string} userId
   * @returns {string} token
   */
  generateToken(userId) {
    return jwt.sign({ id: userId }, envConfig.jwtSecret, {
      expiresIn: envConfig.jwtExpiresIn
    });
  }

  /**
   * Get HTTP-only Cookie Options for JWT
   * @returns {Object} cookieOptions
   */
  getCookieOptions() {
    return {
      expires: new Date(Date.now() + envConfig.cookieExpiresInDays * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: envConfig.nodeEnv === 'production',
      sameSite: envConfig.nodeEnv === 'production' ? 'strict' : 'lax'
    };
  }

  /**
   * Fetch current admin profile
   * @param {string} adminId
   * @returns {Object} admin
   */
  async getAdminProfile(adminId) {
    const admin = await Admin.findById(adminId).select('-password');
    if (!admin) {
      throw new ApiError(404, 'Admin profile not found.');
    }
    return admin;
  }
}

export default new AuthService();
