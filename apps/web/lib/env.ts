import { z } from "zod";

const serverEnvSchema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url(),
});

type ServerEnv = z.infer<typeof serverEnvSchema>;

const serverEnv: ServerEnv = serverEnvSchema.parse(process.env);

export default serverEnv;
