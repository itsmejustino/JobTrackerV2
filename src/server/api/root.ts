import { createTRPCRouter } from "./trpc";
import { jobRouter } from "./routers/jobrouter";
import { notSignedInRouter } from "./routers/notsignedin";
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  jobs: jobRouter,
  notLoggedIn: notSignedInRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
