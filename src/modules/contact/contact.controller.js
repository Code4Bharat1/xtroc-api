import contactService from './contact.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

class ContactController {
  /**
   * Submit Contact / Enquiry Form
   * POST /api/v1/contact
   */
  submitEnquiry = asyncHandler(async (req, res) => {
    const result = await contactService.processContactEnquiry(req.body);
    res.status(200).json(
      new ApiResponse(
        200,
        result,
        'Thank you! Your enquiry has been received successfully. Our team will contact you shortly.'
      )
    );
  });
}

export default new ContactController();
