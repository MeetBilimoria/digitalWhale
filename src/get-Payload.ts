import dotenv from "dotenv";
import path from "path";
import payload, { Payload } from "payload";
import type { InitOptions } from "payload/config";
import nodemailer from "nodemailer"

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const transpoter  = nodemailer.createTransport({
  host:"smtp.resend.com",
  secure:true,
  port:465,
  auth:{
    user:'resend',
    pass:process.env.Resend_api_key
  }

})
let cached = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = {
    client: null,
    promise: null,
  };
}

interface Args {
  initOptions?: Partial<InitOptions>;
}

export const getPayLoadClient = async ({
  initOptions,
}: Args = {}): Promise<Payload> => {
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("Payload_secret is missing");
  }

  if (cached.client) {
    return cached.client;
  }

  if (!cached.promise) {
    // Await the payload.init() call before assigning it to cached.promise
    cached.promise = await payload.init({
      email:{transport:transpoter,fromAddress:"onboarding@resend.dev",fromName:"DigitalWhale"},
      secret: process.env.PAYLOAD_SECRET,
      local: initOptions?.express ? false : true,
      ...(initOptions || {}),
    });
  }

  try {
    cached.client = await cached.promise;
  } catch (e: unknown) {
    cached.promise = null;
    throw e;
  }

  return cached.client;
};
