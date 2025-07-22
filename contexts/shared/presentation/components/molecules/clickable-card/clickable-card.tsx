import { Card } from '@/contexts/shared/presentation/components/ui/card';
import Link from 'next/link';
import React from 'react';

interface ClickableCardProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  cardClassName?: string;
  overlayClassName?: string;
  srText?: string;
}

/**
 * ClickableCard - A reusable card component with clickable overlay and independent action buttons
 *
 * This component creates a card that is clickable for navigation while allowing
 * action buttons to work independently without triggering the navigation.
 *
 * Key Features:
 * - Clickable overlay for navigation
 * - Independent action buttons with higher z-index
 * - Accessible with screen reader text
 * - Customizable styling
 *
 * @example Basic Usage
 * ```tsx
 * <ClickableCard href="/items/123" srText="View item details">
 *   <CardHeader>
 *     <CardTitle>Item Name</CardTitle>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Item description...</p>
 *     <div className="relative z-20">
 *       <Button onClick={handleEdit}>Edit</Button>
 *       <Button onClick={handleDelete}>Delete</Button>
 *     </div>
 *   </CardContent>
 * </ClickableCard>
 * ```
 *
 * @example With Custom Styling
 * ```tsx
 * <ClickableCard
 *   href="/products/456"
 *   srText="View product details"
 *   cardClassName="border-2 border-blue-200"
 *   overlayClassName="hover:bg-blue-50/20"
 * >
 *   <CardContent>
 *     <h3>Product Name</h3>
 *     <p>Product description...</p>
 *     <div className="relative z-20 flex gap-2">
 *       <Button size="sm" onClick={handleAddToCart}>Add to Cart</Button>
 *       <Button size="sm" variant="outline" onClick={handleWishlist}>❤️</Button>
 *     </div>
 *   </CardContent>
 * </ClickableCard>
 * ```
 *
 * @example With Grid Layout
 * ```tsx
 * <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
 *   {items.map(item => (
 *     <ClickableCard key={item.id} href={`/items/${item.id}`}>
 *       <CardContent>
 *         <h3>{item.name}</h3>
 *         <p>{item.description}</p>
 *         <div className="relative z-20 mt-4">
 *           <Button onClick={() => handleAction(item.id)}>Action</Button>
 *         </div>
 *       </CardContent>
 *     </ClickableCard>
 *   ))}
 * </div>
 * ```
 */
export const ClickableCard: React.FC<ClickableCardProps> = ({
  href,
  children,
  className,
  cardClassName,
  overlayClassName,
  srText = 'View details',
}) => {
  return (
    <div className={className}>
      <Card
        className={`hover:shadow-md transition-shadow relative ${cardClassName}`}
      >
        {children}

        {/* Invisible clickable overlay for navigation */}
        <Link
          href={href}
          className={`absolute inset-0 z-10 ${overlayClassName}`}
        >
          <span className="sr-only">{srText}</span>
        </Link>
      </Card>
    </div>
  );
};
