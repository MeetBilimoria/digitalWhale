import { AuthCredentialsValidator } from "@/lib/validators/account-credentials-validator";
import { publicProcedure, router } from "./trpc";
import { getPayLoadClient } from "@/get-Payload";
import { TRPCError } from "@trpc/server";

import { Payload } from "payload";

export const authRouter = router({
    createPayLoadUser : publicProcedure.input(AuthCredentialsValidator).mutation(async({input})=>{
        const {email,password} = input
        const payload = await getPayLoadClient

        const {docs:users} = await payload.find({
            collection:"users",
            where:{
                email:{
                    equals:email,
                }
            }
        })
            if(users.lenght !==0) throw new TRPCError({code:'CONFLICT'})
            await payload.create({
        collection:"users",data:{}})
    })
})