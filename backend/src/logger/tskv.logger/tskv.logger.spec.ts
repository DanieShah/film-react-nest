import { TskvLogger } from './tskv.logger';

describe('TskvLogger', () => {
  let logger: TskvLogger;
  let spy;

  beforeEach(() => {
    logger = new TskvLogger();
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('checking the required data format', () => {
    logger.log('Test Message', ['param1', 'param2']);
    expect(spy).toBeCalledWith(
      'level=log\tmessage=Test Message\toptionalParams=[[["param1","param2"]]]',
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
