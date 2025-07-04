import { Test, TestingModule } from '@nestjs/testing';
import { AppRepository } from './app.repository';

describe('AppRepository', () => {
  let provider: AppRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppRepository],
    }).compile();

    provider = module.get<AppRepository>(AppRepository);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
