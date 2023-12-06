import { plainToInstance } from 'class-transformer';
import { IOffer } from '../offer.entity';
import {
  ProviderConnection,
  ResponseMappingStrategy,
  ResponseValidationStrategy,
} from '../utils/external.providers.service';
import { OfferDetails, Payload } from './primary.provider.interface';
import { PrimaryProviderTransformer } from './primary.provider.transformer';
import { payload as ResponseFromProvider } from './dataset';

export class PrimaryProviderMappingStrategy extends ResponseMappingStrategy<
  Payload,
  IOffer
> {
  mapToOffer(offer: OfferDetails) {
    return plainToInstance(
      PrimaryProviderTransformer,
      {
        ...offer.Offer,
        ...offer.OS,
      },
      { excludeExtraneousValues: true },
    );
  }

  unParseResponse(response: Payload) {
    return Object.keys(response.data).map((key) =>
      this.mapToOffer(response.data[key]),
    );
  }
}

export class PrimaryProviderResponseValidationStrategy extends ResponseValidationStrategy<Payload> {
  validate(payload: Payload) {
    if (payload.status !== 'success') {
      return false;
    }
    return true;
  }
}

export class PrimaryProviderConnection extends ProviderConnection<Payload> {
  fetch() {
    return ResponseFromProvider;
  }
}
