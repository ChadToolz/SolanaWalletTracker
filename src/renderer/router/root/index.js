import { createRootRoute, createRoute } from '@tanstack/react-router';
import Layout from './layout/index.js';

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: function Index() {
      return (
        <div className="p-2">
          <h3>Welcome Home!</h3>
        </div>
      )
    },
  })
  
  const aboutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/about',
    component: function About() {
      return <div className="p-2">Hello from About!</div>
    },
  })

const rootRoute = createRootRoute({
    component: Layout
});

const rootTree = rootRoute.addChildren([
    indexRoute,
    aboutRoute,
]);

export default rootTree;