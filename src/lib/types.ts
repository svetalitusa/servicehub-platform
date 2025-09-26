// User types
export interface User {
  id: string;
  email: string;
  name: string;
  userType: UserType;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserType = 'customer' | 'provider';

export interface CustomerProfile extends User {
  userType: 'customer';
  location?: string;
  preferredCategories?: string[];
}

export interface ProviderProfile extends User {
  userType: 'provider';
  bio?: string;
  skills: string[];
  location: string;
  isVerified: boolean;
  rating: number;
  completedJobs: number;
  priceRange?: {
    min: number;
    max: number;
  };
}

// Authentication types
export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  userType: UserType;
  phone?: string;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

// Form validation schemas
export interface ValidationErrors {
  [key: string]: string;
}

// API Response types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

// JWT Token payload
export interface JWTPayload {
  userId: string;
  email: string;
  userType: UserType;
  iat: number;
  exp: number;
}
