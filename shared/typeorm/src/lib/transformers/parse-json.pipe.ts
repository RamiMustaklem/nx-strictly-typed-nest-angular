import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseJsonPipe<T> implements PipeTransform<string, T> {
  transform<T>(value: string, metadata: ArgumentMetadata): T {
    try {
      return JSON.parse(value);
    } catch (ex) {
      throw new BadRequestException('JSON parse failed');
    }
  }
}
