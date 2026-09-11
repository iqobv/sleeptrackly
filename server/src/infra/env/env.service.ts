import { Environment } from '@config/env.validation';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { z } from 'zod';

@Injectable()
export class EnvService {
	constructor(
		private readonly configService: ConfigService<Environment, true>,
	) {}

	public get<T extends keyof Environment>(key: T): Environment[T] {
		return this.configService.get(key, { infer: true });
	}

	public getGroup<T extends z.ZodObject>(schema: T): z.infer<T> {
		const keys = Object.keys(schema.shape) as (keyof Environment)[];
		const group = {} as Record<keyof Environment, unknown>;

		for (const key of keys) {
			group[key] = this.get(key);
		}

		return group as z.infer<T>;
	}
}
