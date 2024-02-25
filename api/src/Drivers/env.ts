import { z } from 'zod'

const envVarialbes = z.object({
  PORT: z.string(),
  ENVIRONMENT: z.string(),
  MYSQL_HOST: z.string(),
  MYSQL_PORT: z.string(),
  MYSQL_USERNAME: z.string(),
  MYSQL_PASSWORD: z.string(),
  MYSQL_DATABASE: z.string()
})

envVarialbes.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVarialbes> {}
  }
}
