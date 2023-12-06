import { plainToInstance } from 'class-transformer';
import { IOffer } from '../../offers/offer.entity';
import { payload as ResponseFromProvider } from './datasaset';
import { Offer, Payload } from './secondary.provider.interface';
import {
  ProviderConnection,
  ResponseMappingStrategy,
  ResponseValidationStrategy,
} from '../../utils/external.providers.service';
import { SecondaryProviderTransformer } from './secondary.provider.transformer';

export class SecondaryProviderMappingStrategy extends ResponseMappingStrategy<
  Payload,
  IOffer
> {
  mapToOffer(offer: Offer) {
    return plainToInstance(SecondaryProviderTransformer, offer, {
      excludeExtraneousValues: true,
    });
  }
  unParseResponse(response: Payload) {
    return response.response.offers.map(this.mapToOffer);
  }
}

export class SecondaryProviderResponseValidationStrategy extends ResponseValidationStrategy<Payload> {
  validate(payload: Payload) {
    if (!payload.response.offers) {
      return false;
    }
    return true;
  }
}

export class SecondaryProviderConnection extends ProviderConnection<Payload> {
  fetch(): any {
    return ResponseFromProvider;
  }
}
