import testimonialService from './testimonial.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

class TestimonialController {
  /**
   * Submit Testimonial (Public)
   * POST /api/v1/testimonials
   */
  create = asyncHandler(async (req, res) => {
    const testimonial = await testimonialService.createTestimonial(req.body, req.file);
    res.status(201).json(
      new ApiResponse(
        201,
        testimonial,
        'Thank you! Your testimonial has been submitted successfully and is currently under review by our administrator.'
      )
    );
  });

  /**
   * Get Approved Testimonials (Public)
   * GET /api/v1/testimonials
   */
  getPublicList = asyncHandler(async (req, res) => {
    const testimonials = await testimonialService.getPublicApprovedTestimonials();
    res.status(200).json(
      new ApiResponse(200, testimonials, 'Approved testimonials retrieved successfully.')
    );
  });

  /**
   * Get All Testimonials for Admin Dashboard (Protected)
   * GET /api/v1/testimonials/admin
   */
  getAdminList = asyncHandler(async (req, res) => {
    const data = await testimonialService.getAdminTestimonials(req.query);
    res.status(200).json(
      new ApiResponse(200, data, 'Testimonials list retrieved for admin.')
    );
  });

  /**
   * Update Testimonial Status (Protected)
   * PATCH /api/v1/testimonials/admin/:id/status
   */
  updateStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    const testimonial = await testimonialService.updateStatus(id, status);
    res.status(200).json(
      new ApiResponse(200, testimonial, `Testimonial status updated to ${status}.`)
    );
  });

  /**
   * Update Testimonial Details (Protected)
   * PUT /api/v1/testimonials/admin/:id
   */
  update = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const testimonial = await testimonialService.updateTestimonial(id, req.body, req.file);
    res.status(200).json(
      new ApiResponse(200, testimonial, 'Testimonial updated successfully.')
    );
  });

  /**
   * Delete Testimonial (Protected)
   * DELETE /api/v1/testimonials/admin/:id
   */
  delete = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await testimonialService.deleteTestimonial(id);
    res.status(200).json(
      new ApiResponse(200, null, 'Testimonial deleted successfully.')
    );
  });
}

export default new TestimonialController();
