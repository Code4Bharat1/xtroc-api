import authService from './auth.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

class AuthController {
  /**
   * Admin Login Controller
   * POST /api/v1/auth/login
   */
  login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const { admin, token } = await authService.loginAdmin(email, password);

    const cookieOptions = authService.getCookieOptions();

    res
      .cookie('token', token, cookieOptions)
      .status(200)
      .json(
        new ApiResponse(
          200,
          { admin, token },
          'Admin authentication successful.'
        )
      );
  });

  /**
   * Admin Logout Controller
   * POST /api/v1/auth/logout
   */
  logout = asyncHandler(async (req, res) => {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax'
      })
      .status(200)
      .json(new ApiResponse(200, null, 'Logged out successfully.'));
  });

  /**
   * Get Authenticated Admin Profile Controller
   * GET /api/v1/auth/me
   */
  getMe = asyncHandler(async (req, res) => {
    const admin = await authService.getAdminProfile(req.user._id);
    res.status(200).json(new ApiResponse(200, { admin }, 'Admin profile retrieved successfully.'));
  });
}

export default new AuthController();
