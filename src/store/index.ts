import { atom } from "jotai";
import * as z from "zod";

const otpDataSechema = z.object({
  phone: z.coerce.number().int().min(1000000000).max(9999999999),
  otpHash: z.string(),
  expiresAt: z.coerce.number().int(),
});

export type OtpDataType = z.infer<typeof otpDataSechema>;

export const otpDataAtom = atom({
  phone: 0,
  otpHash: "",
  expiresAt: 0,
});

export const userAtom = atom({
  token: "",
});
