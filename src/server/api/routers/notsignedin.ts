import { createTRPCRouter, publicProcedure} from "../trpc";

export const notSignedInRouter = createTRPCRouter({

    NotSignedInMessage: publicProcedure.query(() => {
      return "Please Sign in for this feature.";
    }),
  });
