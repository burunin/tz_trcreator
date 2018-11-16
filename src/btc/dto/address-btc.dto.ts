import { IsString } from 'class-validator';
export class AddressBtcDto {
    @IsString() address: string;
}