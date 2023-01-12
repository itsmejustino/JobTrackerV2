import { z } from "zod";
import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";
// import { router, publicProcedure } from "../trpc";

export const jobRouter = createTRPCRouter({
  // The syntax is identical to creating queries
  addJob: publicProcedure
    .input(
      z.object({
        userId: z.string(),
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
      const { userId, jobName, company, platform, appliedon, interview, followup } = input;
      return prisma.job.create({
        data: {
          userId,
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
  deleteJob: publicProcedure
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
  getAllJobs: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany();
  }),

  getAllUserJobs: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.job.findMany();
  }),

  getSpecificJobs: publicProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.job.findMany({
        where: {
          userId: input,
        },
      });
    }),
});
