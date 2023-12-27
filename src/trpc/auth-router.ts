import { z } from 'zod'
import { getPayLoadClient } from '../get-Payload'
import { AuthCredentialsValidator } from '../lib/validators/account-credentials-validator'
import { publicProcedure, router } from './trpc'

import { TRPCError } from '@trpc/server'
import { Verified } from 'lucide-react'


export const authRouter = router({
  createPayloadUser: publicProcedure
    .input(AuthCredentialsValidator)
    .mutation(async ({ input }) => {
      const { email, password } = input
      const payload = await getPayLoadClient()

      // check if user already exists
      const { docs: users } = await payload.find({
        collection: 'users',
        where: {
          email: {
            equals: email,
          },
        },
      })

      if (users.length !== 0)
        throw new TRPCError({ code: 'CONFLICT' })

      await payload.create({
        collection: 'users',
        data: {
          email,
          password,
          role:"user"
        },
      })
        return{sucess:true, sendToEmail:email}
    
    }),
    verifyEmail :publicProcedure.input(z.object({token:z.string()})).query(async({input})=>{
    const {token} =input
    const payload =await getPayLoadClient()

  const isVerified = await payload.verifyEmail({
  collection: "users",token
  })

  if(!isVerified)
  throw new TRPCError({code:"UNAUTHORIZED"})
  return {success:true}

    }),
    signIn:publicProcedure.input(AuthCredentialsValidator).mutation(async({input})=>{
      const {email,password} = input
        const payload = await getPayLoadClient()
      try {
        await payload.login({
          collection:"users",
          data:{
            email,password
          }
        })
      } catch (error) {
        
      }
    })

})