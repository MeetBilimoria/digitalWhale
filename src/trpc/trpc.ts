import { initTRPC } from "@trpc/server";

const t = initTRPC.context().create()
export const router = t.router

export const publicProcedure = t.procedure


{/*this give us router that have all the api and backend*/}


{/*publicProcedure is use so that any user can use this api*/}