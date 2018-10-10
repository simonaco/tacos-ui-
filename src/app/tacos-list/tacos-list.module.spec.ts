import { TacosListModule } from './tacos-list.module';

describe('TacosListModule', () => {
  let tacosListModule: TacosListModule;

  beforeEach(() => {
    tacosListModule = new TacosListModule();
  });

  it('should create an instance', () => {
    expect(tacosListModule).toBeTruthy();
  });
});
