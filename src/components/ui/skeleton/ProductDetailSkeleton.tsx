export function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 lg:py-12 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-200 h-[500px] rounded-xl"></div>
        <div className="space-y-6">
          <div className="h-12 bg-gray-200 rounded w-3/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-12 bg-gray-200 rounded w-1/2"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}
