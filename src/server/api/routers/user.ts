import {TRPCError} from '@trpc/server'
import {desc, eq} from 'drizzle-orm'
import {z} from 'zod'

import {createTRPCRouter, protectedProcedure} from '@/server/api/trpc'

import {users} from '@/server/db/schema'
import {userProfileFormSchema} from '@/server/db/user-types'
import {hasPermission} from '@/lib/permissions'

export const usersRouter = createTRPCRouter({
  getMe: protectedProcedure.query(async ({ctx}) => {
    if (!ctx.session?.user) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, ctx.session?.user.id),
      columns: {
        id: true,
        name: true,
        email: true,
        image: true,
        roles: true,
      },
    })

    return user
  }),
  getById: protectedProcedure.input(z.string()).query(async ({ctx, input}) => {
    const user = await ctx.db.query.users.findFirst({
      where: eq(users.id, input),
    })

    return user
  }),
  getAll: protectedProcedure.query(async ({ctx}) => {
    // if (!hasPermission(ctx.session?.user, "users", "view", user)) {
    //   throw new TRPCError({ code: "UNAUTHORIZED" });
    // }
    return await ctx.db.query.users.findMany({
      orderBy: desc(users.email),
    })
  }),
  updateMe: protectedProcedure.input(userProfileFormSchema).mutation(async ({ctx, input}) => {
    if (!hasPermission(ctx.session?.user, 'users', 'edit', input)) {
      throw new TRPCError({code: 'UNAUTHORIZED'})
    }

    const [updated] = await ctx.db.update(users).set(input).where(eq(users.id, input.id)).returning({
      id: users.id,
      name: users.name,
      email: users.email,
      // language: users.language,
      image: users.image,
      // phone: users.phone,
    })
    return updated
  }),
})
