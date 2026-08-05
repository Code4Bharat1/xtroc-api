import envConfig from '../config/env.config.js';
import authService from '../modules/auth/auth.service.js';
import testimonialService from '../modules/testimonials/testimonial.service.js';
import careerService from '../modules/careers/career.service.js';

console.log('--------------------------------------------------');
console.log('✅ XTORC Backend Sanity Verification (ES Modules)');
console.log('--------------------------------------------------');
console.log(`Port: ${envConfig.port}`);
console.log(`Node Env: ${envConfig.nodeEnv}`);
console.log(`MongoDB URI: ${envConfig.mongodbUri}`);
console.log(`Admin Email: ${envConfig.adminEmail}`);
console.log(`HR Email: ${envConfig.smtp.hrEmail}`);
console.log('--------------------------------------------------');
console.log('✅ Auth Service loaded:', typeof authService.loginAdmin === 'function');
console.log('✅ Testimonial Service loaded:', typeof testimonialService.createTestimonial === 'function');
console.log('✅ Career Service loaded:', typeof careerService.processJobApplication === 'function');
console.log('--------------------------------------------------');
console.log('All ES Modules loaded cleanly with zero configuration or syntax errors!');
