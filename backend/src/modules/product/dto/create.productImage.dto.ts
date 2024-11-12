import { IsString, IsBoolean, IsOptional, IsNotEmpty } from "class-validator";

export class CreateProductImageDto {
    @IsString()
    @IsNotEmpty()
    src: string;

    @IsOptional()
    @IsBoolean()
    isMain?: boolean;
}