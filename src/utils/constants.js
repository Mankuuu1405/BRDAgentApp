// src/utils/constants.js

export const COLORS = {
  primary: '#5D6AFF',
  primaryDark: '#4A57CC',
  primaryLight: '#8B95FF',
  
  success: '#10B981',
  successLight: '#D1FAE5',
  successDark: '#065F46',
  
  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  warningDark: '#92400E',
  
  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  dangerDark: '#991B1B',
  
  info: '#3B82F6',
  infoLight: '#DBEAFE',
  
  white: '#FFFFFF',
  black: '#000000',
  
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',
  
  background: '#F5F7FA',
  cardBg: '#FFFFFF',
  
  text: {
    primary: '#1F2937',
    secondary: '#6B7280',
    light: '#9CA3AF',
    inverse: '#FFFFFF'
  }
};

export const ROLES = {
  FIELD_INVESTIGATION: 'FI',
  COLLECTION: 'COL',
  CHANNEL_PARTNER: 'CP'
};

export const ROLE_LABELS = {
  [ROLES.FIELD_INVESTIGATION]: 'Field Investigation Officer',
  [ROLES.COLLECTION]: 'Collection Agent',
  [ROLES.CHANNEL_PARTNER]: 'Channel Partner'
};

export const BUCKET_TYPES = {
  SMA_0: 'SMA-0',
  SMA_1: 'SMA-1',
  SMA_2: 'SMA-2',
  NPA: 'NPA'
};

export const VERIFICATION_STATUS = {
  PENDING: 'PENDING',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
  REJECTED: 'REJECTED'
};

export const PAYMENT_MODES = {
  CASH: 'CASH',
  UPI: 'UPI',
  CHEQUE: 'CHEQUE',
  NEFT: 'NEFT',
  RTGS: 'RTGS'
};

export const LOAN_PRODUCTS = {
  PERSONAL: 'Personal Loan',
  HOME: 'Home Loan',
  BUSINESS: 'Business Loan',
  VEHICLE: 'Vehicle Loan',
  GOLD: 'Gold Loan',
  EDUCATION: 'Education Loan'
};

export const APP_CONSTANTS = {
  OTP_LENGTH: 6,
  MPIN_LENGTH: 4,
  OTP_TIMER: 60,
  MAX_PHOTO_SIZE: 5, // MB
  GEO_FENCE_RADIUS: 500, // meters for attendance
  VERIFICATION_RADIUS: 50, // meters for field verification
  AUTO_SYNC_INTERVAL: 15, // minutes
};

export const API_ENDPOINTS = {
  BASE_URL: 'https://api.yourcompany.com/v1',
  
  // Auth
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  VERIFY_OTP: '/auth/verify-otp',
  RESEND_OTP: '/auth/resend-otp',
  
  // Field Investigation
  GET_TASKS: '/field/tasks',
  SUBMIT_VERIFICATION: '/field/verification/submit',
  UPLOAD_MEDIA: '/field/media/upload',
  
  // Collection
  GET_DELINQUENCY_LIST: '/collection/delinquency',
  LOG_PTP: '/collection/ptp',
  SUBMIT_PAYMENT: '/collection/payment',
  GENERATE_RECEIPT: '/collection/receipt',
  
  // Channel Partner
  CREATE_LEAD: '/partner/lead/create',
  GET_LEADS: '/partner/leads',
  CHECK_ELIGIBILITY: '/partner/eligibility',
  GET_PAYOUTS: '/partner/payouts'
};

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@auth_token',
  USER_DATA: '@user_data',
  USER_ROLE: '@user_role',
  DEVICE_ID: '@device_id',
  OFFLINE_QUEUE: '@offline_queue',
  LAST_SYNC: '@last_sync'
};

export const PERMISSIONS = {
  CAMERA: 'camera',
  LOCATION: 'location',
  STORAGE: 'storage',
  MICROPHONE: 'microphone'
};