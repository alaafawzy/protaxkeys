import axios from 'axios';
import Cookies from 'js-cookie';

// رابط الـ API الأساسي (يمكن جعله متغير بيئة Environment Variable مستقبلاً)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.protaxkeys.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;



export const ContactUsApi = async (name, company_name, email, phone, details) => {
  try {
    const response = await api.post('/contactus/', 
      { name, company_name, email, phone, details },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response;
  } catch (error) {
    console.error('Contact Us failed:', error);
    return null;
  }
};