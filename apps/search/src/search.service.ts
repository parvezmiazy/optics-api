import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
    ping() {
    return {
      ok:true,
      service: 'Search Service',
      now : new Date().toISOString()
    }
  }
}
