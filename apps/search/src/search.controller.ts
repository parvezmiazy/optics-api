import { Controller, Get } from '@nestjs/common';
import { SearchService } from './search.service';

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

ping(){
    return this.searchService.ping();
  }
}
