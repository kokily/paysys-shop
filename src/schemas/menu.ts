import { z } from "zod";

export const listMenuSchema = z.object({
  native: z.string().trim().min(1, "분류 확인"),
  divide: z.string().trim().min(1, "구분 확인"),
});
