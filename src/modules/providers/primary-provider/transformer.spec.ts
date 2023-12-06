import { PrimaryProviderTransformer } from './primary.provider.transformer';
import { plainToInstance } from 'class-transformer';

describe('PrimaryProviderTransformer', () => {
  it('should correctly transform and expose fields', () => {
    const input = {
      campaign_id: 123,
      name: 'Test Offer',
      description: 'Test Description',
      instructions: 'Test Requirements',
      icon: 'http://example.com/icon.png',
      tracking_url: 'http://example.com/offer',
      web: true,
      android: false,
      ios: true,
    };

    const transformed = plainToInstance(PrimaryProviderTransformer, input);

    expect(transformed.externalOfferId).toBe('123');
    expect(transformed.name).toBe(input.name);
    expect(transformed.description).toBe(input.description);
    expect(transformed.requirements).toBe(input.instructions);
    expect(transformed.thumbnail).toBe(input.icon);
    expect(transformed.offerUrlTemplate).toBe(input.tracking_url);
    expect(transformed.isDesktop).toBe(1);
    expect(transformed.isAndroid).toBe(0);
    expect(transformed.isIos).toBe(1);
    expect(transformed.providerName).toBe('Primary');
  });
});
