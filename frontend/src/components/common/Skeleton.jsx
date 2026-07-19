import React from 'react';

// Single Product Card Skeleton
export const ProductSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <div className="aspect-[3/4] bg-surface-container rounded-xl w-full relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent shimmer-bg animate-[shimmer_1.5s_infinite_linear]" />
      </div>
      <div className="h-4 bg-surface-container rounded w-3/4" />
      <div className="h-3 bg-surface-container rounded w-1/4" />
    </div>
  );
};

// Grid of Product Skeletons
export const ProductGridSkeleton = ({ count = 8 }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );
};

// Table Row Skeleton
export const TableRowSkeleton = ({ cols = 5 }) => {
  return (
    <tr className="animate-pulse border-b border-surface-container">
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="py-4 px-4">
          <div className="h-4 bg-surface-container rounded w-5/6" />
        </td>
      ))}
    </tr>
  );
};
