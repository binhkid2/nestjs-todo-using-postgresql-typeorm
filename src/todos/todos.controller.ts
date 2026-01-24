import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiQuery,
  ApiResponse,
} from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@ApiTags('Tasks')
@Controller('/api/v1/tasks')
export class TodosController {
  constructor(private readonly service: TodosService) {}

  @Get()
  @ApiOperation({ summary: 'Get paginated tasks' })
  @ApiQuery({ name: 'page', required: false, example: 0 })
  @ApiQuery({ name: 'size', required: false, example: 10 })
  getAll(
    @Query('page') page = '0',
    @Query('size') size = '10',
  ) {
    return this.service.findAll(+page, +size);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by id' })
  getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create task' })
  create(@Body() dto: CreateTodoDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task (partial)' })
  update(
    @Param('id') id: string,
    @Body() dto: UpdateTodoDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
