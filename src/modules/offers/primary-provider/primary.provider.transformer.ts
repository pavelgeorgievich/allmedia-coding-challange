import { Expose, Transform } from 'class-transformer';

export class PrimaryProviderTransformer {
  @Expose({ name: 'campaign_id' })
  @Transform(({ value }) => value.toString(), { toClassOnly: true })
  externalOfferId: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose({ name: 'instructions' })
  requirements: string;

  @Expose({ name: 'icon' })
  thumbnail: string;

  @Expose({ name: 'tracking_url' })
  offerUrlTemplate: string;

  @Expose({ name: 'web' })
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  isDesktop: number;

  @Expose({ name: 'android' })
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  isAndroid: number;

  @Expose({ name: 'ios' })
  @Transform(({ value }) => Number(value), { toClassOnly: true })
  isIos: number;

  @Expose()
  @Transform(() => 'Primary')
  providerName: string;
}
