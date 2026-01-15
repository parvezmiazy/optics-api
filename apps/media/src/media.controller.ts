import { Controller, Get } from '@nestjs/common';
import { MediaService } from './media.service';

@Controller()
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

 ping(){
    return this.mediaService.ping();
  }
}
