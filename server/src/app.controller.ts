import { Controller, Get, Version, VERSION_NEUTRAL } from '@nestjs/common';
import { ApiExcludeController } from '@nestjs/swagger';

@ApiExcludeController()
@Controller()
export class AppController {
	@Get('health')
	@Version(VERSION_NEUTRAL)
	health() {
		return 'OK';
	}
}
