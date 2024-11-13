import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  CreateInventoryDto,
  UpdateInventoryDto,
} from './create.inventories.dto';
// type untuk mendefinisikan category tanpa membuat field
export type CATEGORY = 'RUNNING' | 'JORDAN' | 'BASKETBALL';

// type untuk gender
export type GENDER = 'Men' | 'Women';
// validation untuk product
export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  gender: GENDER;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  category: CATEGORY;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  color: string;

  @IsInt()
  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true }) // Mengaktifkan validasi untuk setiap elemen dalam array
  @Type(() => CreateInventoryDto)
  Inventory?: CreateInventoryDto[];
}

// validation untuk product
// product.dto.ts

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  gender?: GENDER;

  @IsString()
  @IsOptional()
  userId?: string;

  @IsString()
  @IsOptional()
  category?: CATEGORY;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsInt()
  @IsOptional()
  @IsPositive()
  price?: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateInventoryDto)
  Inventory: CreateInventoryDto[]; // Ganti nama properti
}
