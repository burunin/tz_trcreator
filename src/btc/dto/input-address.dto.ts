import { IsString, IsNumber } from 'class-validator';
export class InputAddressDto {
    @IsString() readonly from: string;
    @IsString() readonly to: string;
    @IsNumber() readonly amount: number;
}
