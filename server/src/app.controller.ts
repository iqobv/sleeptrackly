import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';

@Controller()
export class AppController {
	@Get('health')
	@Version(VERSION_NEUTRAL)
	async health() {
		return 'OK';
	}
}
