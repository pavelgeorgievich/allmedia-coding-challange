import { SecondaryProviderTransformer } from './secondary.provider.transformer';
import { plainToInstance } from 'class-transformer';

describe('SecondaryProviderTransformer', () => {
  it('should correctly transform and expose fields', () => {
    const input = {
      offer_id: '456',
      offer_name: 'Another Test Offer',
      offer_desc: 'Another Test Description',
      call_to_action: 'Another Test Requirements',
      image_url: 'http://example.com/another-icon.png',
      offer_url: 'http://example.com/another-offer',
      platform: 'mobile',
      device: 'iphone_ipad',
    };

    const transformed = plainToInstance(SecondaryProviderTransformer, input);

    expect(transformed.externalOfferId).toBe(input.offer_id);
    expect(transformed.name).toBe(input.offer_name);
    expect(transformed.description).toBe(input.offer_desc);
    expect(transformed.requirements).toBe(input.call_to_action);
    expect(transformed.thumbnail).toBe(input.image_url);
    expect(transformed.offerUrlTemplate).toBe(input.offer_url);
    expect(transformed.isDesktop).toBe(0);
    expect(transformed.isAndroid).toBe(0);
    expect(transformed.isIos).toBe(1);
    expect(transformed.providerName).toBe('Secondary');
  });
});
