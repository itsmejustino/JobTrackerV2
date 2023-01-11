import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
// import { router, publicProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  // The syntax is identical to creating queries
  addJob: protectedProcedure
    .input(
      z.object({
        jobName: z.string(),
        company: z.string(),
        platform: z.string(),
        appliedon: z.string(),
        interview: z.string(),
        followup: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { jobName, company, platform, appliedon, interview, followup } = input;
      return prisma.job.create({
        data: {
          jobName,
          company,
          platform,
          appliedon,
          interview,
          followup,
        },
      });

      // Here return the information from the addJob procedure
    }),
  deleteJob: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      const { prisma } = ctx;
      const { id } = input;
      return prisma.job.delete({
        where: {
          id,
        },
      });
    }),
  getAllJobs: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany();
  }),

  getSpecificJobs: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.job.findFirst({
        where: {
          id: input,
        },
      });
    }),
});
