import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

export interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class TodoService {
  private todos: Todo[] = [
    {
      id: '1',
      title: 'Uji Coba Deployment Playbook',
      description: 'Verifikasi pipeline deploy otomatis ke server VPS',
      completed: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'Setup Domain & HTTPS Caddy',
      description: 'Pastikan SSL Let\'s Encrypt terbit dengan baik',
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  findAll(): Todo[] {
    return this.todos;
  }

  findOne(id: string): Todo {
    const todo = this.todos.find((item) => item.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    return todo;
  }

  create(dto: CreateTodoDto): Todo {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: dto.title,
      description: dto.description || '',
      completed: dto.completed ?? false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.todos.push(newTodo);
    return newTodo;
  }

  update(id: string, dto: UpdateTodoDto): Todo {
    const todo = this.findOne(id);
    if (dto.title !== undefined) todo.title = dto.title;
    if (dto.description !== undefined) todo.description = dto.description;
    if (dto.completed !== undefined) todo.completed = dto.completed;
    todo.updatedAt = new Date();
    return todo;
  }

  remove(id: string): { success: boolean; message: string } {
    const index = this.todos.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }
    this.todos.splice(index, 1);
    return { success: true, message: `Todo with ID ${id} removed successfully` };
  }
}
