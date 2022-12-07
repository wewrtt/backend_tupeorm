import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty({
    description: 'name',
    example: 'React Js',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}
