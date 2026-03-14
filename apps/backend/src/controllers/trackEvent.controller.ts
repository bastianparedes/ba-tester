import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { z } from 'zod';
import { TypeApiTrackEvents } from '../../../domain/api/trackEvents';
import { quantitiesAvailable } from '../../../domain/config';
import commonConstants from '../../../domain/constants';
import { permissions } from '../../../domain/permissions';
import { type AssertEqual } from '../../../domain/types/utils';
import { AuthGuard } from '../guards/auth.guard';
import { ZodValidationPipe } from '../pipes/zod';
import { DbService } from '../services/db.service';
import { type Request } from '../types/request';

/* ---------- QUERY SCHEMA ---------- */

const getTrackEventQuerySchema = z
  .object({
    orderBy: z.enum(['status', 'name', 'id', 'updatedAt']),
    orderDirection: z.enum(commonConstants.orderDirection),
    page: z.coerce.number().int(),
    quantity: z.coerce
      .number()
      .int()
      .refine((v) => quantitiesAvailable.includes(v), { message: 'Invalid quantity' }),
    statusList: z.preprocess(
      (val) => {
        if (!val) return [];
        if (typeof val === 'string') return [val];
        return val;
      },
      z.array(z.enum(commonConstants.arrayStatus)),
    ),
    textSearch: z.string(),
  })
  .strip();

/* ---------- BODY SCHEMA ---------- */

const trackEventSchema = z
  .object({
    getData: z.string(),
    multipleTimes: z.boolean(),
    name: z.string(),
    status: z.enum(commonConstants.arrayStatus),
  })
  .strip();

/* ---------- CONTROLLER ---------- */

@Controller('tenants/:tenantId/track-events')
export class TrackEventController {
  constructor(private readonly dbService: DbService) {}

  @UseGuards(AuthGuard(permissions.trackEvent.read))
  @Get()
  async getMany(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Query(new ZodValidationPipe(getTrackEventQuerySchema)) query: AssertEqual<
      z.infer<typeof getTrackEventQuerySchema>,
      TypeApiTrackEvents['getMany']['request']['queryParams']
    >,
  ): Promise<TypeApiTrackEvents['getMany']['response']> {
    const trackEvents = await this.dbService.trackEvents.getMany({
      params: query,
      tenantId,
    });

    return trackEvents;
  }

  @UseGuards(AuthGuard(permissions.trackEvent.read))
  @Get(':trackEventId')
  async get(@Param('tenantId', ParseIntPipe) tenantId: number, @Param('trackEventId', ParseIntPipe) trackEventId: number): Promise<TypeApiTrackEvents['get']['response']> {
    const trackEvent = await this.dbService.trackEvents.get({
      tenantId,
      trackEventId,
    });

    if (!trackEvent) throw new NotFoundException();
    return { trackEvent };
  }

  @UseGuards(AuthGuard(permissions.trackEvent.create))
  @Post()
  async create(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Body(new ZodValidationPipe(trackEventSchema)) body: AssertEqual<z.infer<typeof trackEventSchema>, TypeApiTrackEvents['create']['request']['body']>,
    @Req() req: Request,
  ): Promise<TypeApiTrackEvents['create']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();

    await this.dbService.trackEvents.create({
      tenantId,
      userId: user.id,
      values: body,
    });

    return {};
  }

  @UseGuards(AuthGuard(permissions.trackEvent.update))
  @Put(':trackEventId')
  async update(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('trackEventId', ParseIntPipe) trackEventId: number,
    @Body(new ZodValidationPipe(trackEventSchema)) body: AssertEqual<z.infer<typeof trackEventSchema>, TypeApiTrackEvents['update']['request']['body']>,
    @Req() req: Request,
  ): Promise<TypeApiTrackEvents['update']['response']> {
    const user = req.user;
    if (!user) throw new UnauthorizedException();
    await this.dbService.trackEvents.update({
      tenantId,
      trackEventId,
      userId: user.id,
      values: body,
    });

    return {};
  }

  @UseGuards(AuthGuard(permissions.trackEvent.delete))
  @Put(':trackEventId/remove')
  async remove(
    @Param('tenantId', ParseIntPipe) tenantId: number,
    @Param('trackEventId', ParseIntPipe) trackEventId: number,
  ): Promise<TypeApiTrackEvents['update']['response']> {
    await this.dbService.trackEvents.remove({
      tenantId,
      trackEventId,
    });

    return {};
  }
}
