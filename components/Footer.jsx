import Image from "next/image";
import Link from "next/link";
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";
// تأكد من صحة مسار زر الناف
import NavButton from "./Button"; 

// دالة جلب البيانات من السيرفر مباشرة (بدون useEffect)
async function getFooterData() {
  try {
    // ضع هنا رابط الـ API الخاص بـ Django
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api'}/footer/`, {      // إعادة جلب البيانات كل ساعة (3600 ثانية) لتخفيف الضغط على السيرفر
      next: { revalidate: 3600 } 
    });
    
    if (!response.ok) return null;
    const data = await response.json();
    return Array.isArray(data) && data.length > 0 ? data[0] : data;
  } catch (error) {
    console.error('Error fetching footer data:', error);
    return null;
  }
}

export default async function Footer({ dict, locale, direction, paths }) {
  const Footer_text = dict.Footer;
  const isRTL = direction === 'rtl';
  const prefix = `/${locale}`;
  const margin_icons = isRTL ? "ms-3" : "me-3";

  // جلب البيانات قبل رسم المكون (Server-side Fetching)
  const footerData = await getFooterData();

  return (
    <div className="footer-section">
      <div className="container">
        {/* قسم الاشتراك بالنشرة */}
        <div className={`row mb-5 align-items-center pt-5 flex-column-reverse ${isRTL ? 'flex-md-row' : 'flex-md-row-reverse'}`}>
          <div className="col-12 col-md-8 pt-3">
            <div className="input-group">
              <NavButton className="px-3 py-3 mx-2">
                {Footer_text?.btn || "Subscribe"}
              </NavButton>
              <input
                type="text"
                className="form-control rounded footer-email-input"
                placeholder={Footer_text?.placeHolder || "Enter your email"}
                aria-label="Email"
              />
              <span className="input-group-text footer-email-icon">
                <FaEnvelope />
              </span>
            </div>
          </div>
          <div className={`col-12 col-md-4 pt-3 ${isRTL ? 'text-end' : 'text-start'} text-md-${isRTL ? 'end' : 'start'}`}>
            <Image 
              src="/images/footer_logo.png" 
              alt="Footer Logo" 
              width={150} 
              height={50} 
              style={{ height: "auto", width: "150px" }} // إضافة height: "auto" أو العكس
            />
          </div>
        </div>

        <hr className="footer-hr" />

        {/* قسم الروابط والتواصل */}
        <div className={`row ${isRTL ? 'text-end' : 'text-start'} text-md-${isRTL ? 'end' : 'start'} mb-4 pt-5 footer-contact flex-column-reverse ${isRTL ? 'flex-md-row-reverse' : 'flex-md-row'}`}>
          
          {/* السوشيال ميديا */}
          <div className="col-md-5 mb-3">
            <h6 className="footer-titles">{Footer_text.followUs}</h6>
            <div className={`d-flex gap-3 justify-content-${isRTL ? 'end' : 'start'} justify-content-md-${isRTL ? 'end' : 'start'} mt-4 footer-text flex-wrap`}>
              {footerData?.youtube_url && (
                <a href={footerData.youtube_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <FaYoutube size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.facebook_url && (
                <a href={footerData.facebook_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <FaFacebook size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.twitter_url && (
                <a href={footerData.twitter_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <FaTwitter size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.instagram_url && (
                <a href={footerData.instagram_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <FaInstagram size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.linkedin_url && (
                <a href={footerData.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <FaLinkedin size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
              {footerData?.whatsapp_url && (
                <a href={footerData.whatsapp_url} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit' }}>
                  <FaWhatsapp size={24} style={{ cursor: 'pointer' }} />
                </a>
              )}
            </div>
          </div>

          {/* بيانات الاتصال */}
          <div className="col-md-4 mb-3" dir={isRTL ? "ltr" : "rtl"}>
            <h6 className="footer-titles">{Footer_text.contactUs}</h6>
            <div className="mt-4 footer-text">
              <p>
                <a href={`mailto:${footerData?.email || 'info@111prokeys.com'}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {footerData?.email || 'info@111prokeys.com'}
                </a>
                <FaEnvelope className={margin_icons} style={{ color: "#47C1CA" }} />
              </p>
              <p>
                <a href={`tel:${footerData?.phone || '+971-507034621'}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  {footerData?.phone || '+971-507034621'}
                </a>
                <FaPhone className={margin_icons} style={{ color: "#47C1CA" }} />
              </p>
              <p>
                {isRTL ? (footerData?.arabic_address || 'مكتب 43-44 الفهيدي') : (footerData?.english_address || 'Office 43-44 Al Fahidi')}
                <FaMapMarkerAlt className={margin_icons} style={{ color: "#47C1CA" }} />
              </p>
            </div>
          </div>

          {/* روابط الموقع */}
          <div className="col-md-3 mb-3">
            <h6 className="footer-titles">{Footer_text.browseWebsite}</h6>
            <ul className="list-unstyled mt-4 footer-text">
              <li><Link href={`${prefix}/`} style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.home}</Link></li>
              <li><Link href={`${prefix}/${paths.about}`} style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.aboutUs}</Link></li>
              <li><Link href={`${prefix}/${paths.bundles}`} style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.packages}</Link></li>
              <li><Link href={`${prefix}/${paths.services}`} style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.services}</Link></li>
              <li><Link href={`${prefix}/${paths.contact}`} style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.contact}</Link></li>
              <li><Link href={`${prefix}/${paths.blogs}`} style={{ textDecoration: 'none', color: 'inherit' }}>{Footer_text.blogs}</Link></li>
            </ul>
          </div>
        </div>

        <hr className="footer-hr" />

        {/* حقوق النشر */}
        <div className="row">
          <div className="col text-center mt-4 mb-4">
            <small style={{ color: "#FFFFFF" }}>{Footer_text.copyright}</small>
          </div>
        </div>
      </div>
    </div>
  );
}