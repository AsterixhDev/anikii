import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  // Home route
  index("routes/home.tsx"),
  
  // Search route
  route("search", "routes/search.tsx"),
  
  // Anime detail route
  route("anime/:id", "routes/animeDetail.tsx"),
  
  // 404 Not Found route - this should be the last route
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
