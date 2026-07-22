import axios from 'axios';
import Cookies from 'js-cookie';

// رابط الـ API الأساسي (يمكن جعله متغير بيئة Environment Variable مستقبلاً)
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;

// export const checkAuthStatus = async () => {
//   try {
//     const response = await api.get('/user/');
//     return response;
//   } catch (error) {
//     console.error('Error checking authentication status:', error);
//     return null;
//   }
// };

// export const login = async (email, password) => {
//   try {
//     const response = await api.post('/login/', { email, password });
//     return response;
//   } catch (error) {
//     console.error('Login failed:', error);
//     return error;
//   }
// };

// export async function logout() {
//   try {
//     const response = await api.get('/logout/');
//     return response.status === 200;
//   } catch (error) {
//     console.error('An error occurred during logout:', error);
//     return false;
//   }
// }

// export const RegisterApi = async (first_name, last_name, email, password, phone, tax_record) => {
//   try {
//     const response = await api.post('/register/', 
//       { first_name, last_name, email, password, phone, tax_record },
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Register failed:', error);
//     return null;
//   }
// };

// export const AddFeedback = async (description, role) => {
//   try {
//     // التحقق من أننا في جهة المتصفح قبل قراءة الـ document.cookie
//     let csrfToken = typeof window !== 'undefined' ? Cookies.get('csrftoken') : null;
//     if (!csrfToken && typeof document !== 'undefined') {
//       const match = document.cookie.match(/csrftoken=([^;]+)/);
//       csrfToken = match ? match[1] : null;
//     }

//     const response = await api.post('/comment/', 
//       { description, role },
//       {
//         headers: { 'X-CSRFToken': csrfToken },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error('Feedback submission failed:', error);
//     return error;
//   }
// };

// export const ForgetPasswordApi = async (email) => {
//   try {
//     const csrfToken = typeof window !== 'undefined' ? Cookies.get('csrftoken') : null;
//     const response = await api.post('/forget-password/', 
//       { email },
//       {
//         headers: { 'X-CSRFToken': csrfToken },
//       }
//     );
//     return response;
//   } catch (error) {
//     console.error('Forget Password failed:', error);
//     return error;
//   }
// };

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