# AGENTS.md

This file contains guidelines and conventions for agentic coding agents working in this portfolio repository.

## Project Overview

This is a React + TypeScript + Vite portfolio application with:
- React 19 with TypeScript
- Tailwind CSS v4 for styling
- i18next for internationalization (English/French)
- jsPDF for PDF export functionality
- Mobile-responsive design with viewport handling

## Available Commands

### Development
```bash
npm run dev          # Start development server
npm run build        # Build for production (runs TypeScript check + Vite build)
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Testing
This project currently has no test framework configured. Add testing setup if needed.

## Code Style Guidelines

### Imports
- Use default imports for React: `import { useState, useEffect } from "react"`
- Use named exports for components: `export function ComponentName()`
- Group imports: React hooks first, then external libraries, then internal imports
- Place i18n imports after React imports: `import { useTranslation } from "react-i18next"`

### Component Structure
- Use function components with TypeScript interfaces for props
- Name component files with kebab-case: `component-name.tsx`
- Export components as named exports, not default exports
- Define interfaces above the component function

```typescript
interface ComponentProps {
  data: DataType;
  onAction?: () => void;
}

export function ComponentName({ data, onAction }: ComponentProps) {
  // Component logic
}
```

### TypeScript & Types
- Use interfaces for object shapes, types for unions/primitives
- Define interfaces close to where they're used
- Use proper typing for all props and state
- Use `React.ReactNode` for children prop type

### State & Hooks
- Use `useState` for local state
- Use custom hooks for complex logic (see `hooks/` directory)
- Custom hook files should be named `use-hook-name.ts`
- Export custom hooks as named exports: `export function useCustomHook()`

### Styling with Tailwind
- Use Tailwind utility classes only, no custom CSS
- Follow mobile-first responsive design: `className="base md:responsive"`
- Use semantic spacing with the scale: `gap-2`, `gap-4`, `gap-8`
- Leverage Tailwind's design tokens for consistency
- Use snap scrolling for full-screen sections: `snap-y snap-proximity snap-start`

### File Organization
- `src/components/` - React components
- `src/hooks/` - Custom React hooks
- `src/utils/` - Utility functions
- `src/locales/` - i18n translation files

### Internationalization
- Use `useTranslation` hook for all user-facing strings
- Provide fallback text in English: `t("key", "Default text")`
- Keys should be structured: `component.property`
- Keep translation keys consistent across en.json and fr.json

### Error Handling
- Use proper TypeScript to prevent runtime errors
- Handle async operations with try-catch where needed
- Provide loading states for async operations (see PDF export)

### Performance & Mobile
- Use `useEffect` with proper cleanup for event listeners
- Implement mobile viewport handling with Visual Viewport API
- Use `100dvh` for viewport height on mobile devices
- Handle touch events properly for mobile interactions

### Naming Conventions
- Components: PascalCase (`HeroSection`)
- Functions/variables: camelCase (`handleClick`)
- Files: kebab-case (`hero-section.tsx`)
- Interfaces: PascalCase with descriptive names (`HeroSectionProps`)

### Git & Development
- Run `npm run lint` before committing
- Ensure TypeScript compilation succeeds: `npm run build`
- Test responsive design on mobile and desktop
- Verify internationalization works for both languages

## Configuration Files

- `vite.config.ts` - Vite build configuration with React and Tailwind plugins
- `eslint.config.js` - ESLint with TypeScript and React hooks rules
- `tsconfig.json` - TypeScript configuration with project references
- `src/i18n.ts` - i18next configuration for English/French support

## Common Patterns

### Modal Pattern
Use the `CenteredModal` component as base for custom modals. Example: `ProjectModal`, `PdfLanguageModal`.

### Data Fetching
Use custom hooks for data fetching. See `usePortfolioData` hook pattern.

### Section Structure
Portfolio sections should follow this pattern:
```typescript
<section id="section-id" className="h-screen snap-start flex flex-col px-6 py-24">
  {/* Section content */}
</section>
```

### Export Functionality
PDF export is handled through `utils/pdf-export.ts` with language selection modal.

## Things to Avoid
- Don't add external dependencies without justification
- Don't use inline styles (use Tailwind classes)
- Don't ignore TypeScript errors
- Don't skip responsive design testing
- Don't hardcode strings that should be internationalized