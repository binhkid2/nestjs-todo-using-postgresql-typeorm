import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PageResponse } from '../common/page-response';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly repo: Repository<Todo>,
  ) {}

  async findAll(
    page = 0,
    size = 10,
  ): Promise<PageResponse<Todo>> {
    const [content, totalElements] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip: page * size,
      take: size,
    });

    const totalPages = Math.ceil(totalElements / size);

    return {
      content,
      totalElements,
      totalPages,
      size,
      number: page,
      first: page === 0,
      last: page + 1 >= totalPages,
      numberOfElements: content.length,
      empty: content.length === 0,
    };
  }

  async findOne(id: string): Promise<Todo> {
    const todo = await this.repo.findOneBy({ id });
    if (!todo) throw new NotFoundException('Task not found');
    return todo;
  }

async create(dto: CreateTodoDto): Promise<Todo> {
  const todo = new Todo();

  todo.title = dto.title;
  todo.description = dto.description ?? null;
  todo.completed = dto.completed ?? false;

  // 👇 explicit (even though constructor already does it)
  todo.createdAt = new Date();

  return this.repo.save(todo);
}

  async update(id: string, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOne(id);

    Object.assign(todo, dto);

    return this.repo.save(todo);
  }

  async remove(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
