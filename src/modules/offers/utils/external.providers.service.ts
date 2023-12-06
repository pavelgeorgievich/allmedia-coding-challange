import { Injectable, Logger } from '@nestjs/common';

export abstract class ProviderConnection<T> {
  abstract fetch(): T;
}

export abstract class ResponseMappingStrategy<T, U> {
  abstract unParseResponse(response: T): U[];
  abstract mapToOffer(offer: unknown): U;
}

export abstract class ResponseValidationStrategy<T> {
  abstract validate(payload: T): boolean;
}

@Injectable()
export class ExternalProvidersService<T, U> {
  private readonly logger = new Logger(ExternalProvidersService.name);
  constructor(
    private readonly connection: ProviderConnection<T>,
    private readonly validation: ResponseValidationStrategy<T>,
    private readonly responseMapping: ResponseMappingStrategy<T, U>,
  ) {}

  async pull(): Promise<T> {
    try {
      return this.connection.fetch();
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  async getOffers(): Promise<U[]> {
    const payload = await this.pull();
    this.validation.validate(payload);
    return this.responseMapping.unParseResponse(payload);
  }
}

export function ProviderFactory<T, U>(injectionToken: string) {
  return {
    provide: injectionToken,
    useFactory: (
      connection: ProviderConnection<T>,
      validationStrategy: ResponseValidationStrategy<T>,
      mappingStrategy: ResponseMappingStrategy<T, U>,
    ) =>
      new ExternalProvidersService(
        connection,
        validationStrategy,
        mappingStrategy,
      ),
    inject: [
      ProviderConnection,
      ResponseValidationStrategy,
      ResponseMappingStrategy,
    ],
  };
}
