import { createRouter, ErrorComponent } from '@tanstack/react-router';

import routeTree from './root/index.js';

const router = createRouter({
    routeTree,
    defaultPendingComponent: () => (
      <div className={`p-2 text-2xl`}>
        {/* <Spinner /> */}
        <p>Loading...</p>
      </div>
    ),
    defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
    defaultPreload: 'intent',
  });

  export default router;