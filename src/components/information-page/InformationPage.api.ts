import type { InformationPageData } from "../../types/information-page";

const isDevelopment = import.meta.env.DEV;
const frontendUrl = isDevelopment
  ? "http://localhost:5173"
  : "https://1099-partner.com";

const baseApiUrl = isDevelopment
  ? "/blogs/api/v2"
  : "https://esign-admin.signmary.com/blogs/api/v2";

export const fetchAllInformationPages = async (): Promise<
  InformationPageData[]
> => {
  try {
    const apiUrl = `${baseApiUrl}/information-pages/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch information pages: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || !data.items) {
      return [];
    }

    return data.items;
  } catch (error) {
    console.error("Error fetching information pages:", error);
    return [];
  }
};

export const fetchInformationPageBySlug = async (
  slug: string
): Promise<InformationPageData | null> => {
  try {
    const apiUrl = `${baseApiUrl}/information-pages/?slug=${slug}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch information page: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      return null;
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching information page by slug:", error);
    return null;
  }
};

export const fetchInformationPageById = async (
  id: number
): Promise<InformationPageData | null> => {
  try {
    const apiUrl = `${baseApiUrl}/information-pages/${id}/`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch information page: ${response.status} ${response.statusText}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching information page by ID:", error);
    return null;
  }
};

export const fetchInformationPageByModuleSlug = async (
  moduleSlug: string
): Promise<InformationPageData | null> => {
  try {
    const apiUrl = `${baseApiUrl}/information-pages/?module_slug=${moduleSlug}`;

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": frontendUrl,
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch information page: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();

    if (!data || !data.items || data.items.length === 0) {
      return null;
    }

    return data.items[0];
  } catch (error) {
    console.error("Error fetching information page by module slug:", error);
    return null;
  }
};
