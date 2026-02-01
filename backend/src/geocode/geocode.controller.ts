import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { GeocodeService } from './geocode.service';

@Controller('geocode')
export class GeocodeController {
  constructor(private readonly geocodeService: GeocodeService) {}

  @Get('reverse')
  async reverse(
    @Query('lat') lat?: string,
    @Query('lon') lon?: string,
  ) {
    if (!lat || !lon) {
      throw new BadRequestException(
        'Parâmetros lat e lon são obrigatórios',
      );
    }

    return this.geocodeService.reverse(lat, lon);
  }
}
