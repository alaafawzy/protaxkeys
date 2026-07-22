import axios from 'axios';
import { API_BASE_URL } from './apis';


// Determine current language (defaults to English)
const getCurrentLanguage = () => {
  if (typeof window === 'undefined') return 'en';

  try {
    const stored = localStorage.getItem('i18nextLng');
    if (stored) {
      return stored.toLowerCase().startsWith('ar') ? 'ar' : 'en';
    }
  } catch (e) {
    // ignore access errors and fall back
  }

  const htmlLang = document.documentElement?.lang;
  if (htmlLang && htmlLang.toLowerCase().startsWith('ar')) {
    return 'ar';
  }

  return 'en';
};


/**
 * Fetch metadata for a specific page
 * @param {string} app - App name (portal, bundles, about, blog)
 * @param {string} pageIdentifier - Page identifier or name
 * @returns {Promise<Object>} Metadata object
 */
export const fetchPageMetadata = async (app) => {
  try {
    let url;
    if (app==''){url = `${API_BASE_URL}/metadata/`;}
    else { url = `${API_BASE_URL}/${app}/metadata/`;}
    const response = await axios.get(
      url
    );
    return response.data[0];
  } catch (error) {
    console.error(`Error fetching ${app} metadata for page =:`, error);
    return null;
  }
};

/**
 * Fetch metadata by ID
 * @param {string} app - App name (portal, bundles, about, blog)
 * @param {number} id - Metadata ID or resource ID for filtering
 * @param {string} filterParam - Optional filter parameter name (e.g., 'service' for filtering by service ID)
 * @returns {Promise<Object>} Metadata object with meta tags
 */
export const fetchMetadataById = async (app, id, filterParam = null) => {
  try {
    let url;
    if (filterParam) {
      // Use query parameter filtering (e.g., ?service=1)
      url = `${API_BASE_URL}/${app}/?${filterParam}=${id}`;
      const response = await axios.get(url);
      // Return first result if it's an array
      return Array.isArray(response.data) ? response.data[0] : response.data;
    } else {
      // Use direct ID lookup
      url = `${API_BASE_URL}/${app}/${id}/`;
      const response = await axios.get(url);
      return response.data;
    }
  } catch (error) {
    console.error(`Error fetching metadata for ${app} with ID ${id}:`, error);
    return null;
  }
};

/**
 * Fetch blog metadata by blog ID
 * @param {number} blogId - Blog post ID
 * @returns {Promise<Object>} Blog metadata with meta tags
 */
// export const fetchBlogMetadata = async (blogId) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/blog/metadata/${blogId}/`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error fetching blog metadata for blog ID ${blogId}:`, error);
//     return null;
//   }
// };

/**
 * Apply metadata to the page (sets title and meta tags)
 * Supports new per-language fields like
 * english_page_title_for_metadata / arabic_page_title_for_metadata
 * and english_page_description_for_metadata / arabic_page_description_for_metadata.
 * Falls back to old shape with page_title + meta_tags if present.
 * @param {Object} metadata
 */
export const applyPageMetadata = (metadata) => {
  if (!metadata) return;

  const lang = getCurrentLanguage();

  // Determine title from new model first, then fall back
  const title =
    (lang === 'ar'
      ? metadata.arabic_page_title_for_metadata
      : metadata.english_page_title_for_metadata) ||
    metadata.page_title ||
    metadata.title;

  if (title) {
    document.title = title;
  }

  // Remove old meta tags (except those we shouldn't touch)
  const metaTagsToRemove = document.querySelectorAll(
    'meta[data-managed-by="prokeys"]'
  );
  metaTagsToRemove.forEach(tag => tag.remove());

  // Determine description from new model, then fall back
  const description =
    (lang === 'ar'
      ? metadata.arabic_page_description_for_metadata
      : metadata.english_page_description_for_metadata) ||
    metadata.meta_description ||
    metadata.description;

  // Primary description meta tag from new model
  if (description) {
    const meta = document.createElement('meta');
    meta.setAttribute('data-managed-by', 'prokeys');
    meta.setAttribute('name', 'description');
    meta.content = description;
    document.head.appendChild(meta);
  }

  // Backwards-compatibility: apply explicit meta_tags array if present
  if (metadata.meta_tags && Array.isArray(metadata.meta_tags)) {
    metadata.meta_tags.forEach(tag => {
      const meta = document.createElement('meta');
      meta.setAttribute('data-managed-by', 'prokeys');
      meta.setAttribute(tag.attribute_type, tag.meta_name);
      meta.content = tag.meta_content;
      document.head.appendChild(meta);
    });
  }
};

/**
 * Fetch and apply metadata for a page
 * @param {string} app - App name (portal, bundles, about, blog)
 * @param {string} pageIdentifier - Page identifier or name
 */

/**
 * Fetch and apply metadata by ID
 * @param {string} app - App name
 * @param {number} id - Metadata ID
 */
export const fetchAndApplyMetadataById = async (app, id) => {
  const metadata = await fetchMetadataById(app, id);
  if (metadata) {
    applyPageMetadata(metadata);
  }
  return metadata;
};


