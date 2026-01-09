export interface GalleryImage {
  id: number;
  image: {
    id: number;
    url: string;
    title: string;
  } | null;
  description: string;
  order: number;
}

export interface ImageGalleryPage {
  id: number;
  title: string;
  slug: string;
  heading: string;
  text: string;
  paragraph: string;
  gallery_images: GalleryImage[];
  ending_note: string;
}
const isDevelopment = import.meta.env.DEV;
const frontendUrl = isDevelopment
  ? "http://localhost:5173"
  : "https://1099-partner.com";

const API_BASE_URL = "https://esign-admin.signmary.com/blogs/api/v2";

export async function fetchGalleryPages(): Promise<ImageGalleryPage[]> {
  const response = await fetch(`${API_BASE_URL}/gallery-pages/`, {
    headers: {
      "Content-Type": "application/json",
      "X-Frontend-URL": frontendUrl,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch gallery pages");
  const data = await response.json();
  return data.items || [];
}

export async function fetchGalleryPage(
  slug: string
): Promise<ImageGalleryPage> {
  const response = await fetch(`${API_BASE_URL}/gallery-pages/?slug=${slug}`, {
    headers: {
      Accept: "application/json",
      "X-Frontend-URL": window.location.origin,
    },
  });
  if (!response.ok) throw new Error("Failed to fetch gallery page");
  const data = await response.json();
  return data.items?.[0] || null;
}

export function getFullImageUrl(url: string): string {
  if (!url) return "";
  if (url.startsWith("http")) return url;
  return `https://esign-admin.signmary.com${url}`;
}
