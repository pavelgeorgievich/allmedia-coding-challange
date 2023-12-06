import { IsString, IsUrl, IsNumber, Min, Max } from 'class-validator';
import { IOffer } from './offer.entity';

export class OfferDTO implements IOffer {
  @IsString()
  externalOfferId: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsString()
  requirements: string;

  @IsUrl()
  thumbnail: string;

  @IsNumber()
  @Min(0)
  @Max(1)
  isDesktop: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  isAndroid: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  isIos: number;

  @IsUrl()
  offerUrlTemplate: string;

  @IsString()
  providerName: string;
}
