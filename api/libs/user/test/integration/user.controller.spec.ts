import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '@app/user/user.service';
import { UserController } from '@app/user/user.controller';
import { UserRepository } from '@app/user/repositories/user.repository';
import { AuthService } from '@app/auth/auth.service';
import { ConfigService } from '@nestjs/config';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        { provide: UserRepository, useValue: {} },
        { provide: 'UserModel', useValue: {} },
        { provide: AuthService, useValue: {} },
        { provide: ConfigService, useValue: {} },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});