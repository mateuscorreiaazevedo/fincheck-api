import z from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string(),
    PORT: z.coerce.number().optional().default(5555)
});

const env = envSchema.parse(process.env);

export default env;
