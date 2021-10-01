import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ path: 'account', host: ':host' })
export class AccountController {
  @Get()
  getInfo(@HostParam('host') host: string) {
    return host;
  }
}
