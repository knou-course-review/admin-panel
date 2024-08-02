import { z } from "zod";

export const ErrorSchema = z.instanceof(Error);
