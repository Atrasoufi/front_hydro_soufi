import type {
  Education,
  Industry,
  IndustryFilter,
  IndustryHome,
  Paginated,
  Product,
  ProductCategory,
  Service,
  EducationCategory,
  EducationHome
} from "./types";

const base = process.env.API_BASE_URL?.replace(/\/$/, "");

export const apiUrl = (path: string) => {
  return `${base || "http://localhost:8000"}${path}`;
};

async function get<T>(
  path: string,
  revalidate = 300,
): Promise<T> {
  const res = await fetch(apiUrl(path), {
    next: {
      revalidate,
    },
    headers: {
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API ${res.status}: ${path}`);
  }

  return res.json();
}

/* =========================
   Products
========================= */

export const getProducts = (query = "") => {
  return get<Paginated<Product>>(
    `/products/api/products/${query}`,
  );
};

export const getFeaturedProducts = async (): Promise<Product[]> => {
  const data = await get<unknown>(
    "/products/api/featured/",
  );

  if (Array.isArray(data)) {
    return data as Product[];
  }

  if (
    data &&
    typeof data === "object" &&
    "results" in data &&
    Array.isArray(
      (data as { results: unknown[] }).results,
    )
  ) {
    return (data as { results: Product[] }).results;
  }

  return [];
};

export const getProductCategories =
  async (): Promise<ProductCategory[]> => {
    const data = await get<unknown>(
      "/products/api/categorys/",
    );

    const raw = Array.isArray(data)
      ? data
      : (data as { results?: unknown[] })?.results ?? [];

    return raw
      .map((item: any) => ({
        id: Number(item?.id),
        name: String(
          item?.name ?? item?.title ?? "",
        ),
        slug: item?.slug,
      }))
      .filter(
        (item) =>
          Number.isFinite(item.id) &&
          item.name,
      );
  };

/* =========================
   Industries
========================= */

export const getIndustriesHome = () => {
  return get<IndustryHome[]>(
    "/industries/api/home/",
  );
};

export const getIndustries = () => {
  return get<Industry[]>(
    "/industries/api/industries/",
  );
};

export const getIndustryFilters = () => {
  return get<IndustryFilter[]>(
    "/industries/api/filters/",
  );
};

/* =========================
   Services
========================= */

export const getServices = () => {
  return get<Service[]>(
    "/services/api/services/",
  );
};

export const getHomeService = () => {
  return get<Service>(
    "/services/api/services/home/",
  );
};

/* =========================
   Education
========================= */
export const getEducationCategories = () => {
  return get<EducationCategory[]>(
    "/education/api/cagetory/",
  );
};

export const getEducation = (query: string) => {
  return get<Paginated<Education>>(
    `/education/api/educations/${query}`,
  );
};

export const getEducatoinHome = () => {
  return get<EducationHome[]>(
    "/education/api/home/"
  )

}
