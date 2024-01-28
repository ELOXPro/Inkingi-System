import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const schoolRouter = createTRPCRouter({

  create: publicProcedure
    .input(z.object({
      schoolname: z.string().toLowerCase(),
      province: z.string().toLowerCase(),
      district: z.string().toLowerCase(),
      sector: z.string().toLowerCase(),
      adminname: z.string().toLowerCase(),
      phonenumber: z.string().length(10),
      password: z.string().min(4),
      checkboxes: z.object({
        primary: z.boolean(),
        ordinary: z.boolean(),
        reb: z.boolean(),
        tvet: z.boolean(),
      }),
    }))
    .mutation(async ({ ctx, input }) => {

      const existingUser = await ctx.db.user.findFirst({ where: { phonenumber: input.phonenumber }})

      if (existingUser){
        return {result : "User already exists"}
      }

      const schoolData = await ctx.db.school.create({
        data: {
          name: input.schoolname,
          province: input.province,
          district: input.district,
          sector: input.sector,
          reb: input.checkboxes.reb,
          ordinary: input.checkboxes.ordinary,
          primary: input.checkboxes.primary,
          tvet: input.checkboxes.tvet,
        },
      });

      const adminData = await ctx.db.user.create({
        data: {
          name: input.adminname,
          password: input.password,
          phonenumber: input.phonenumber,
          schoolId: schoolData.id,
        }
      })

      const addRole = await ctx.db.role.create({
        data: {
          role: "admin",
          user: {
            connect: {
              id: adminData.id,
            },
        }}
      })

      return adminData && schoolData && addRole ? { result: "School Added" } : { result: "School Not Added" }
    }),

  findSchool: publicProcedure.input(z.string()).query(({ ctx, input }) => {
    return ctx.db.school.findFirst({
      where: { id: input },
      select: {
        id: true,
        name: true,
        province: true,
        district: true,
        sector: true,
      }
    })
  }),
});
