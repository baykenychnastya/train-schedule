import { Test, TestingModule } from '@nestjs/testing';
import { ThainScheduleController } from './thain-schedule.controller';

describe('ThainScheduleController', () => {
  let controller: ThainScheduleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ThainScheduleController],
    }).compile();

    controller = module.get<ThainScheduleController>(ThainScheduleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
