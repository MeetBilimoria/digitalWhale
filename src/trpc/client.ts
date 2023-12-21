import  {createTRPCReact} from "@trpc/react-query"
import type { AppRouter } from "./"
export const trpc = createTRPCReact<AppRouter>({})


{/*this is use to integrate react with trpc basically is help us to wrap the api */}