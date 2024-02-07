import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const userRouter = createTRPCRouter({

  create: publicProcedure

    .input(z.object({
      id: z.string(),
      role: z.string().toLowerCase(),
      name: z.string().toLowerCase(),
      phonenumber: z.string().length(10),
      password: z.string().min(4)
    }))
    .mutation(async ({ ctx, input }) => {

      const existingUser = await ctx.db.user.findFirst({ where: { phonenumber: input.phonenumber } })

      if (existingUser) {
        return { result: "User already exists" }
      }

      const userData = await ctx.db.user.create({
        data: {
          name: input.name,
          password: input.password,
          phonenumber: input.phonenumber,
          schoolId: input.id,
        }
      })

      const addRole = await ctx.db.role.create({
        data: {
          role: input.role,
          user: {
            connect: {
              id: userData.id,
            },
          }
        }
      })

      return userData && addRole ? { result: `${input.role} Added` } : { result: `${input.role} Not Added` }
    }),
});
