export type IndustryFilter = { id: number; name: string };
export type ProductCategory = { id: number; name: string; slug?: string };
export type Industry = { id?: number; name: string; slug: string; short_description: string; icon: string; cover_image: string };
export type IndustryHome = { id: number; name: string; cover_image: string };
export type Product = { id: number; name: string; slug: string; short_description: string; image: string };
export type Education = { title: string; slug: string; excerpt?: string | null; content_type?: string; featured_media: string; published_at?: string | null };
export type Service = { id: number; name: string; slug: string; cover_image?:string; short_description: string; icon: string; is_featured: boolean; is_active: boolean };
export type Paginated<T> = { count: number; next: string | null; previous: string | null; results: T[] };
export type EducationCategory = {
  id: number;
  name: string;
};
export type EducationHome = {
    slug: string;
    title: string;
    featured_media: string;
}