import React from "react";
import InformationPage from "./InformationPage";
import { useInformationPage, useInformationPages } from "./useInformationPage";

// Example 1: Render by module slug
export const DocMergeInfoPage: React.FC = () => {
  return <InformationPage moduleSlug="doc-merge" />;
};

// Example 2: Render by page slug
export const ESignatureInfoPage: React.FC = () => {
  return <InformationPage slug="esignature-info" />;
};

// Example 3: Using the hook for custom rendering
export const CustomInfoPageRenderer: React.FC<{ moduleSlug: string }> = ({
  moduleSlug,
}) => {
  const { data, loading, error } = useInformationPage({ moduleSlug });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
      <h1>{data.title}</h1>
      <p>Module: {data.module_name}</p>
      <p>Hero Title: {data.hero.title}</p>
      <p>
        Features Count: {data.quick_features.length + data.key_features.length}
      </p>
    </div>
  );
};

// Example 4: List all information pages
export const InfoPagesList: React.FC = () => {
  const { data, loading, error } = useInformationPages();

  if (loading) return <div>Loading pages...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>All Information Pages</h2>
      <ul>
        {data.map((page) => (
          <li key={page.id}>
            <strong>{page.module_name}</strong> - {page.title}
            <br />
            <small>
              Slug: {page.slug} | Module Slug: {page.module_slug}
            </small>
          </li>
        ))}
      </ul>
    </div>
  );
};
