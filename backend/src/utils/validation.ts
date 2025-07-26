import { Request, Response, NextFunction } from 'express';

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateRequired = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const missingFields = fields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Missing required fields',
        missing: missingFields
      });
    }
    
    next();
  };
};

export const validateDogProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, breed } = req.body;
  
  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({
      error: 'Name is required and must be a non-empty string'
    });
  }
  
  if (!breed || typeof breed !== 'string' || breed.trim().length === 0) {
    return res.status(400).json({
      error: 'Breed is required and must be a non-empty string'
    });
  }
  
  // Validation optionnelle pour date_of_birth
  if (req.body.date_of_birth && !isValidDate(req.body.date_of_birth)) {
    return res.status(400).json({
      error: 'Invalid date format for date_of_birth'
    });
  }
  
  next();
};

const isValidDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '');
};