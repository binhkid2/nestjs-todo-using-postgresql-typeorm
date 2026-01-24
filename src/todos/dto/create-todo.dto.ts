import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean, Length } from 'class-validator';

export class CreateTodoDto {
  @ApiProperty({ example: 'Buy milk' })
  @IsString()
  @Length(1, 255)
  title: string;

  @ApiPropertyOptional({ example: 'From supermarket' })
  @IsOptional()
  @IsString()
  description?: string | null;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  completed?: boolean;
}
