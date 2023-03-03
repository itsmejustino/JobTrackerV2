import { createTRPCRouter, publicProcedure} from "../trpc";

export const notSignedInRouter = createTRPCRouter({

    NotSignedInMessage: publicProcedure.query(() => {
      return "You must be signed in to use this application.";
    }),
  });
