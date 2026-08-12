import { z } from "zod";

export const credentialsSchema = z.object({
  username: z.string().min(1, "사용자 이름을 입력하세요"),
  password: z.string().min(6, "비밀번호는 최소 6자리입니다"),
});

export type CredentialsInput = z.infer<typeof credentialsSchema>;

export const changePasswordSchema = z
  .object({
    password: z.string().min(6, "비밀번호는 최소 6자리입니다"),
    confirmPassword: z.string().min(1, "비밀번호를 확인하세요"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
