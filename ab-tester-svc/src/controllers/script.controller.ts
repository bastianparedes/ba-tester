import { Controller, Get, Header, Param, ParseIntPipe } from '@nestjs/common';
import { ScriptService } from '../services/script.service';

@Controller('public/tenants/:tenantId')
export class ScriptController {
  constructor(private readonly scriptService: ScriptService) {}

  @Get('script')
  @Header('Content-Type', 'text/javascript; charset=utf-8')
  @Header('Access-Control-Allow-Origin', '*')
  async get(@Param('tenantId', ParseIntPipe) tenantId: number): Promise<string> {
    const script = await this.scriptService.getScript({ tenantId });
    return script;
  }
}
