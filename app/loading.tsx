import { Skeleton } from '../components/shared/Skeleton';
export default function Loading() {
  return <div className="bg-[#f6f8fa]"><Skeleton className="h-16 rounded-none" /><div className="container-site py-10"><Skeleton className="h-[340px]" /></div></div>;
}
