import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({
  path: '_healthz',
  version: VERSION_NEUTRAL,
})
export class HealthController {
  @Get()
  get() {
    return 'OK';
  }
}
