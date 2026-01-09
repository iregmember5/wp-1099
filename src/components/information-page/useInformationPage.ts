import { useState, useEffect } from "react";
import type { InformationPageData } from "../../types/information-page";
import {
  fetchInformationPageBySlug,
  fetchInformationPageById,
  fetchInformationPageByModuleSlug,
  fetchAllInformationPages,
} from "./InformationPage.api";

interface UseInformationPageProps {
  pageId?: number;
  slug?: string;
  moduleSlug?: string;
}

export const useInformationPage = ({
  pageId,
  slug,
  moduleSlug,
}: UseInformationPageProps = {}) => {
  const [data, setData] = useState<InformationPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        let result: InformationPageData | null = null;

        if (pageId) {
          result = await fetchInformationPageById(pageId);
        } else if (slug) {
          result = await fetchInformationPageBySlug(slug);
        } else if (moduleSlug) {
          result = await fetchInformationPageByModuleSlug(moduleSlug);
        }

        setData(result);
        if (!result) {
          setError("Page not found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load page");
      } finally {
        setLoading(false);
      }
    };

    if (pageId || slug || moduleSlug) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [pageId, slug, moduleSlug]);

  return { data, loading, error };
};

export const useInformationPages = () => {
  const [data, setData] = useState<InformationPageData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await fetchAllInformationPages();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load pages");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
