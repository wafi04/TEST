import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateInventoryDto {
  @IsString()
  productId: string;

  @IsString()
  size: string;

  @IsNumber()
  quantity: number;
}
export class UpdateInventoryDto {
  @IsOptional()
  @IsString()
  productId?: string;

  @IsOptional()
  @IsString()
  size?: string;

  @IsOptional()
  @IsNumber()
  quantity?: number;
}
