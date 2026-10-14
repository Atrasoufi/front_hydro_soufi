import PageShell from '../../components/shared/PageShell';
import Hero from '../../components/shared/Hero';
import ProductCatalog from '../../components/products/ProductCatalog';
import { getIndustryFilters, getProductCategories, getProducts } from '../../lib/api';
import type { IndustryFilter, ProductCategory } from '../../lib/types';

const fallbackCategories: ProductCategory[] = [
  { id: 1, name: 'جک‌های هیدرولیک' },
  { id: 2, name: 'پاورپک و یونیت هیدرولیک' },
  { id: 3, name: 'پرس‌های هیدرولیک' },
  { id: 4, name: 'بالابر و آسانسور هیدرولیک' },
  { id: 5, name: 'شیرها و قطعات هیدرولیک' },
  { id: 6, name: 'تجهیزات صنایع ریلی' },
];

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const query = new URLSearchParams();

  const append = (key: string) => {
    const value = params[key];
    if (Array.isArray(value)) value.forEach((v) => query.append(key, v));
    else if (value) query.set(key, value);
  };

  append('page');
  append('search');
  append('category');
  append('industry_product');

  const [products, categories, industries] = await Promise.allSettled([
    getProducts(query.toString() ? `?${query.toString()}` : ''),
    getProductCategories(),
    getIndustryFilters(),
  ]);

  const productData = products.status === 'fulfilled'
    ? products.value
    : { count: 0, next: null, previous: null, results: [] };

  const categoryData = categories.status === 'fulfilled' && categories.value.length
    ? categories.value
    : fallbackCategories;

  const industryData: IndustryFilter[] = industries.status === 'fulfilled' ? industries.value : [];

  return (
    <PageShell>
      <Hero
        eyebrow="کاتالوگ هیدرولیک صوفی"
        title="محصولات و تجهیزات هیدرولیک صنعتی"
        description="محصولات، تجهیزات و راهکارهای هیدرولیک را بر اساس دسته‌بندی، صنعت و نیاز پروژه پیدا کنید."
        image="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?auto=format&fit=crop&w=1800&q=80"
      />
      <ProductCatalog data={productData} categories={categoryData} industries={industryData} />
    </PageShell>
  );
}
