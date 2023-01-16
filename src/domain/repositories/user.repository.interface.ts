import {
  CreateUserModel,
  UpdateUserModel,
  UserModel,
} from '@domain/model/database/user';
import { EntityManager } from 'typeorm';

export interface IUserRepository {
  create(
    data: CreateUserModel,
    conn?: EntityManager,
  ): Promise<UserModel | null>;

  findById(id: number, conn?: EntityManager): Promise<UserModel | null>;

  findByName(name: string, conn?: EntityManager): Promise<UserModel | null>;

  update(
    id: number,
    data: UpdateUserModel,
    conn?: EntityManager,
  ): Promise<void>;

  delete(id: number): Promise<boolean>;

  softDelete(id: number): Promise<boolean>;
}
