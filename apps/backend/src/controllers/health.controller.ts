import fs from 'node:fs';
import path from 'node:path';
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  async get() {
    const fileExists = fs.existsSync(path.join(process.cwd(), 'build', 'script.js'));
    return {
      deployed: true,
      fileExists,
    };
  }
}
