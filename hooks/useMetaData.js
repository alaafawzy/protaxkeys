import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/utils/apis'; 

// دالة لجلب الميتا داتا من السيرفر
const fetchPageMetadata = async (pageName) => {
  try {
    const response = await api.get(`/metadata/${pageName}/`);
    setMetadata(response.data);
  } catch (error) {
    // تجاهل خطأ 404 إذا كانت الصفحة لا تمتلك metadata مخصصة على الباك إند
    if (error.response?.status !== 404) {
      console.error("Error fetching metadata:", error);
    }
  }
};

export const fetchMetadataById = async (app, id, filterParam = null) => {
  try {
    const url = filterParam ? `/metadata/${app}/${id}/?filter=${filterParam}` : `/metadata/${app}/${id}/`;
    const response = await api.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching metadata by id:", error);
    return null;
  }
};

// دالة لتطبيق الميتا داتا آمنة للعمل على السيرفر والمتصفح
export const applyPageMetadata = (metadata) => {
  if (typeof window === 'undefined') return; // منع التنفيذ على السيرفر

  if (metadata?.title) {
    document.title = metadata.title;
  }

  if (metadata?.description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      metaDesc.setAttribute('data-managed-by', 'prokeys');
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = metadata.description;
  }
};

/**
 * Custom hook to fetch and apply page metadata (للاستخدام داخل Client Components فقط)
 */
export const usePageMetadata = (app) => {
  // const { i18n } = useTranslation();

  // useEffect(() => {
  //   const loadMetadata = async () => {
  //     const metadata = await fetchPageMetadata(app);
  //     if (metadata) {
  //       applyPageMetadata(metadata);
  //     }
  //   };

  //   loadMetadata();

  //   return () => {
  //     if (typeof window !== 'undefined') {
  //       document.querySelectorAll('meta[data-managed-by="prokeys"]').forEach(tag => {
  //         tag.remove();
  //       });
  //     }
  //   };
  // }, [app, i18n.language]);
};

/**
 * Custom hook to fetch and apply metadata by ID
 */
export const useMetadataById = (app, id, filterParam = null) => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const loadMetadata = async () => {
      const metadata = await fetchMetadataById(app, id, filterParam);
      if (metadata) {
        applyPageMetadata(metadata);
      }
    };

    if (id) {
      loadMetadata();
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.querySelectorAll('meta[data-managed-by="prokeys"]').forEach(tag => {
          tag.remove();
        });
      }
    };
  }, [app, id, filterParam, i18n.language]);
};