import { Injectable, InternalServerErrorException } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodeService {
  private readonly nominatimUrl =
    'https://nominatim.openstreetmap.org/reverse';

  async reverse(lat: string, lon: string) {
    try {
      const response = await axios.get(this.nominatimUrl, {
        params: {
          lat,
          lon,
          format: 'json',
        },
        headers: {
          // User-Agent exigido pelo Nominatim
          'User-Agent':
            'ParticipaDF-Ouvidoria/1.0 (contato@participa.df.gov.br)',
        },
        timeout: 8000,
      });

      return response.data;
    } catch (error) {
      console.error('Erro ao acessar Nominatim:', error);

      throw new InternalServerErrorException(
        'Erro ao obter endereço a partir da localização',
      );
    }
  }
}
