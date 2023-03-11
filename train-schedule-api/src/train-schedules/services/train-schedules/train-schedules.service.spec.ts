import { Test, TestingModule } from '@nestjs/testing';
import { TrainSchedulesService } from './train-schedules.service';

describe('TrainSchedulesService', () => {
  let service: TrainSchedulesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainSchedulesService],
    }).compile();

    service = module.get<TrainSchedulesService>(TrainSchedulesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
