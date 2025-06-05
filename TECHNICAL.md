# NTH GitHub Trending - Technical Documentation

This document provides technical details about the NTH GitHub Trending application, explaining its architecture, key components, and implementation details.

## Architecture Overview

The application follows a modern React application architecture with the following key aspects:

1. **Component-Based Structure**: UI is organized into reusable components
2. **Route-Based Code Organization**: Features are organized by routes
3. **API Layer**: Abstraction for external data fetching
4. **State Management**: Combination of React Query for server state and Zustand for client state
5. **Type Safety**: TypeScript throughout the codebase

## Key Technologies

### Frontend Framework

- **React 19**: The latest version of React with improved performance and features
- **TypeScript**: For type safety and better developer experience

### Routing

- **TanStack Router**: Type-safe routing solution with built-in data loading capabilities
- **File-based routing**: Routes are organized in the `src/routes` directory

### Data Fetching

- **TanStack Query**: For data fetching, caching, and state management of server data
- **Infinite Queries**: Used for implementing infinite scrolling of repository results

### UI Components

- **Radix UI**: Accessible, unstyled components as the foundation
- **Tailwind CSS**: For styling and responsive design
- **Custom UI Components**: Built on top of Radix primitives with Tailwind

### State Management

- **Zustand**: For managing client-side state (filters, theme, etc.)
- **React Query**: For server-state management

### Build Tools

- **Vite**: Fast build tool and development server
- **ESLint**: For code linting
- **Prettier**: For code formatting

## Core Components

### API Layer

The API layer abstracts GitHub API calls in `src/api/repository.ts`:

```typescript
export const fetchTrending = async (filters: {
  startDate: string | Date;
  endDate: string | Date;
  language?: string;
  token?: string;
}): Promise<Repository> => {
  // Implementation
};
```

It handles:

- Transforming filter parameters to GitHub API format
- Authentication with GitHub tokens
- Error handling
- Response transformation

### Filtering System

Filters are managed through custom hooks in `src/hooks/useFilters.ts`:

- Date range selection (daily, weekly, monthly)
- Programming language selection
- Persistence of filter preferences

### Repository Components

- `RepositoryHeader`: Displays metadata about the repository list
- `RepositoryCard`: Card component to display individual repository information
- `RepositoryItem`: Contains the repository display logic

### UI Component Library

Custom UI components in `src/components/ui/` built on Radix UI primitives:

- Buttons
- Cards
- Dialogs
- Selects
- Avatars
- etc.

## Data Flow

1. User selects filters (date range, language)
2. Filters are stored in Zustand store
3. TanStack Query uses these filters to fetch data
4. Components subscribe to query results
5. UI renders based on the data state (loading, error, success)

## Performance Considerations

- **Virtualization**: For long lists of repositories
- **Infinite Scrolling**: To load data as the user scrolls
- **Query Caching**: To prevent unnecessary API calls
- **Memoization**: To prevent unnecessary re-renders

## GitHub API Integration

The application uses the GitHub Search API:

- Endpoint: `https://api.github.com/search/repositories`
- Parameters:
  - `q`: Search query (language, date range)
  - `sort`: Sort field (stars)
  - `order`: Sort direction (desc)

Rate limiting is handled by:

- Allowing users to add their GitHub token
- Implementing proper error handling for rate limit errors

## Theme System

The application includes a theme system with light and dark modes:

- Stored in local storage for persistence
- Toggled via ThemeToggle component
- Implemented with Tailwind CSS dark mode

## Development Workflow

### Development Server

```bash
npm run dev
```

Starts the Vite development server on port 3000.

### Build

```bash
npm run build
```

Builds the application for production.

### Linting and Formatting

```bash
npm run lint     # Run ESLint
npm run format   # Run Prettier
npm run check    # Run both ESLint and Prettier and fix issues
```

## Future Improvements

- Add unit and integration tests
- Implement server-side rendering (SSR)
- Add more filtering options
- Implement repository bookmarking
- Add user authentication beyond API tokens

## Common Issues and Solutions

### GitHub API Rate Limiting

**Issue**: GitHub API has rate limits for unauthenticated requests.
**Solution**: Implement token-based authentication and proper error handling.

### Type Safety

**Issue**: Ensuring type safety with external API data.
**Solution**: Comprehensive type definitions in `src/types.ts`.

### Performance with Large Lists

**Issue**: Performance degradation with large lists.
**Solution**: Implement virtualization and pagination/infinite scrolling.
