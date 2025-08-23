import { ParseUUIDPipe, type ArgumentMetadata } from '@nestjs/common';

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  override async transform(
    value: string,
    metadata: ArgumentMetadata,
  ): Promise<string> {
    if (typeof value === 'undefined') {
      return '';
    }

    return super.transform(value, metadata);
  }
}
