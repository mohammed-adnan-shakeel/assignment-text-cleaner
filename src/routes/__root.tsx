import { createRootRoute, Outlet } from '@tanstack/react-router';
import appCss from '../styles.css?url';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { title: 'Text Cleaner' },
      { name: 'description', content: 'Clean copied text by removing AI footers, point markers, and instructions.' },
    ],
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: () => <Outlet />,
});