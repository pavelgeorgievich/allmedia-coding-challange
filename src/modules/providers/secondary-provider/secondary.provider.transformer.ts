import { Expose, Transform } from 'class-transformer';

export class SecondaryProviderTransformer {
  @Expose({ name: 'offer_id' })
  externalOfferId: string;

  @Expose({ name: 'offer_name' })
  name: string;

  @Expose({ name: 'offer_desc' })
  description: string;

  @Expose({ name: 'call_to_action' })
  requirements: string;

  @Expose({ name: 'image_url' })
  thumbnail: string;

  @Expose({ name: 'offer_url' })
  offerUrlTemplate: string;

  @Expose()
  @Transform(({ obj }) => Number(obj.platform === 'desktop'))
  isDesktop: number;

  @Expose()
  @Transform(({ obj }) =>
    Number(obj.platform === 'mobile' && obj.device !== 'iphone_ipad'),
  )
  isAndroid: number;

  @Expose()
  @Transform(({ obj }) =>
    Number(obj.platform === 'mobile' && obj.device === 'iphone_ipad'),
  )
  isIos: number;

  @Expose()
  @Transform(() => 'Secondary')
  providerName: string;
}
