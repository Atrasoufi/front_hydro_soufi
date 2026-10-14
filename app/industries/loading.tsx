import { GridSkeleton } from '../../components/shared/Skeleton';
export default function Loading() {
  return <section className="bg-[#f6f8fa] py-12 md:py-16"><div className="container-site"><GridSkeleton count={8} /></div></section>;
}
