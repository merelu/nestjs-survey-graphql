import { CreateUserModel, UserModel } from '@domain/model/database/user';
import { EntityManager } from 'typeorm';

export interface IUserRepository {
  create(data: CreateUserModel, conn?: EntityManager): Promise<UserModel>;

  findById(id: number, conn?: EntityManager): Promise<UserModel>;

  findAll(): Promise<UserModel[]>;

  update(id: number, conn?: EntityManager): Promise<void>;

  delete(id: number, conn?: EntityManager): Promise<void>;

  softDelete(id: number, conn?: EntityManager): Promise<void>;
}
