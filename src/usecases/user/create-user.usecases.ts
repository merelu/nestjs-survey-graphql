import { IException } from '@domain/adapters/exception.interface';
import { CommonErrorCodeEnum } from '@domain/common/enums/error-code.enum';
import { CreateUserModel } from '@domain/model/database/user';
import { IUserRepository } from '@domain/repositories/user.repository.interface';

export class CreateUserUseCases {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly exceptionService: IException,
  ) {}

  async execute(data: CreateUserModel) {
    await this.checkUserName(data.name);
    const result = await this.userRepository.create(data);
    if (!result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INTERNAL_SERVER,
        error_text: '확인되지 않은 에러입니다.',
      });
    }
    return result;
  }

  private async checkUserName(name: string): Promise<void> {
    const result = await this.userRepository.findByName(name);
    if (result) {
      throw this.exceptionService.apolloServerException({
        error_code: CommonErrorCodeEnum.INVALID_PARAM,
        error_text: '중복된 이름입니다.',
      });
    }
  }
}
