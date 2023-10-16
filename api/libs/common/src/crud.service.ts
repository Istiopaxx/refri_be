import { NotFoundException } from '@nestjs/common';
import { ICrudRepository } from './crud.repository';

export class CrudService<Entity, CreateDto, UpdateDto> {
  private repository: ICrudRepository<Entity, CreateDto, UpdateDto>;
  constructor(repository: ICrudRepository<Entity, CreateDto, UpdateDto>) {
    this.repository = repository;
  }

  async create(createDto: CreateDto): Promise<Entity> {
    return await this.repository.create(createDto);
  }

  async findAll(): Promise<Entity[]> {
    return await this.repository.findAll();
  }

  async findOne(id: string): Promise<Entity> {
    const ret = await this.repository.findOne(id);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return ret;
  }

  async update(id: string, updateDto: UpdateDto): Promise<Entity> {
    const ret = await this.repository.update(id, updateDto);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
    return ret;
  }

  async deleteOne(id: string): Promise<void> {
    const ret = await this.repository.deleteOne(id);
    if (!ret) {
      throw new NotFoundException(`Entity with id ${id} not found`);
    }
  }
}