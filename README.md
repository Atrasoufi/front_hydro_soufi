# Hydraulic Soofi — Next.js + Tailwind

## API
Set `API_BASE_URL` in `.env.local` to the Django API base URL.

Products:
- `GET /products/api/products/` — pagination, search, category, industry_product
- `GET /products/api/categorys/` — product categories (spelling follows the supplied API)
- `GET /products/api/products/{slug}/` — product detail

Services:
- `GET /services/apiservices/`
- `GET /services/apiservices/home/`
- `GET /services/apiservices/{id}/`

Industries:
- `GET /industries/api/home/`
- `GET /industries/api/industries/`
- `GET /industries/api/filters/`

Education:
- `GET /education/api/educations/`
- `GET /education/api/education/{slug}/`

## Performance choices
- Server-side API fetching with Next revalidation.
- Home lower sections render after IntersectionObserver enters a 500px preload zone.
- Next/Image is lazy by default for below-the-fold images.
- `loading.tsx` skeletons are provided for route transitions.
- Product filters update URL query params so server pagination/search/filtering stay cacheable and shareable.
- Backend category data is preferred; static categories are only a fallback if the category endpoint fails/returns no data.
- Home backend data is preferred; static fallback content is used only when the relevant endpoint is unavailable/empty.
