# Button.tsx

## Summary

`Button.tsx` is a reusable, styled button component built with React and Tailwind CSS. It supports multiple variants, sizes, loading states, and uses the `clsx` and `tailwind-merge` utilities for dynamic class composition.

## File Location

```
Resume-Builder-Test/components/ui/Button.tsx
```

## Dependencies

```typescript
import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
```

| Import | Source | Purpose |
|--------|--------|---------|
| `React` | react | Component definition, forwardRef |
| `clsx` | clsx | Conditional class joining |
| `twMerge` | tailwind-merge | Merge conflicting Tailwind classes |

## Utility Function

```typescript
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Combines `clsx` for conditional classes with `tailwind-merge` to handle conflicting Tailwind utility classes (e.g., `p-2` and `p-4`).

## Props Interface

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive';
  size?: 'sm' | 'default' | 'lg' | 'icon';
  isLoading?: boolean;
}
```

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `string` | `'default'` | Visual style variant |
| `size` | `string` | `'default'` | Button size |
| `isLoading` | `boolean` | `false` | Shows loading spinner |
| `...props` | Inherited | - | All native button attributes |

## Variants

### Visual Variants

| Variant | Classes | Description |
|---------|---------|-------------|
| `default` | `bg-primary text-primary-foreground hover:bg-primary/90` | Primary action button |
| `destructive` | `bg-destructive text-destructive-foreground hover:bg-destructive/90` | Delete/danger actions |
| `outline` | `border border-input bg-background hover:bg-accent hover:text-accent-foreground` | Secondary with border |
| `secondary` | `bg-secondary text-secondary-foreground hover:bg-secondary/80` | Secondary filled |
| `ghost` | `hover:bg-accent hover:text-accent-foreground` | Minimal, no background |

### Size Variants

| Size | Classes | Dimensions |
|------|---------|------------|
| `sm` | `h-9 rounded-md px-3` | Small button |
| `default` | `h-10 px-4 py-2` | Standard size |
| `lg` | `h-11 rounded-md px-8` | Large button |
| `icon` | `h-10 w-10` | Square icon button |

## Base Styles

```typescript
"inline-flex items-center justify-center whitespace-nowrap rounded-md 
 text-sm font-medium ring-offset-background transition-colors 
 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring 
 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
```

| Style Group | Purpose |
|-------------|---------|
| `inline-flex items-center justify-center` | Flex centering |
| `whitespace-nowrap` | Prevent text wrapping |
| `rounded-md text-sm font-medium` | Rounded corners, typography |
| `ring-offset-background transition-colors` | Focus ring setup, smooth hover |
| `focus-visible:ring-*` | Keyboard focus indicator |
| `disabled:*` | Disabled state styling |

## Loading State

```typescript
{isLoading ? (
  <span className="mr-2 h-4 w-4 animate-spin rounded-full 
                   border-2 border-current border-t-transparent" />
) : null}
{children}
```

- Shows spinning circle before content
- Uses CSS animation (`animate-spin`)
- Transparent top border creates spinner effect
- Button disabled during loading

## Implementation

```typescript
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(baseStyles, variantStyles, sizeStyles, className)}
        {...props}
      >
        {/* Loading spinner + children */}
      </button>
    );
  }
);

Button.displayName = "Button";
```

### forwardRef Pattern

- Forwards `ref` to native button element
- Allows parent components to access button DOM node
- Enables use with form libraries, focus management

### displayName

```typescript
Button.displayName = "Button";
```

Helps with React DevTools debugging.

## Usage Examples

### Basic Usage

```tsx
<Button onClick={handleClick}>
  Click Me
</Button>
```

### Variants

```tsx
<Button variant="destructive">Delete</Button>
<Button variant="outline">Cancel</Button>
<Button variant="ghost">Menu</Button>
<Button variant="secondary">Secondary</Button>
```

### Sizes

```tsx
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

### With Loading

```tsx
<Button isLoading disabled>
  Saving...
</Button>
```

### With Icons

```tsx
<Button className="gap-2">
  <Printer className="w-4 h-4" />
  Print
</Button>
```

### Custom Classes

```tsx
<Button className="text-purple-600">
  Custom Color
</Button>
```

## Class Merge Example

```tsx
// This works correctly:
<Button className="bg-red-500">Custom BG</Button>

// tailwind-merge handles conflict:
// base: bg-primary → merged result: bg-red-500
```

## Lines of Code

- **Total Lines:** 47
- **File Size:** ~2.0 KB
