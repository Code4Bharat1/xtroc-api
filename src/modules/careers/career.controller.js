import careerService from './career.service.js';
import asyncHandler from '../../utils/asyncHandler.js';
import ApiResponse from '../../utils/apiResponse.js';

class CareerController {
  /**
   * Submit Job Application (Public Visitor)
   * POST /api/v1/careers/apply
   */
  apply = asyncHandler(async (req, res) => {
    const result = await careerService.processJobApplication(req.body, req.file);
    res.status(200).json(
      new ApiResponse(
        200,
        result,
        'Your job application has been submitted successfully! Our recruitment team will review your application and contact you soon.'
      )
    );
  });
}

export default new CareerController();
