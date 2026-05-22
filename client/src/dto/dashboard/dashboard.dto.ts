import { dashboardQuerySchema } from "@/schemas";
import z from "zod";

export type DashboardQueryDto = z.infer<typeof dashboardQuerySchema>;
