import { JsonLogger } from './json.logger';

describe('JsonLogger', () => {
  let logger: JsonLogger;
  let spy;

  beforeEach(() => {
    logger = new JsonLogger();
    spy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    spy.mockReset();
  });

  it('checking the required data format', () => {
    logger.log('Test Message', ['param1', 'param2']);
    expect(spy).toBeCalledWith(
      '{"level":"log","message":"Test Message","optionalParams":[[["param1","param2"]]]}',
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
