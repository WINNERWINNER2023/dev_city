require('dotenv').config();

const mockMulter = {
  diskStorage: jest.fn(),
}
const mockPath = 'testPath';

const UploadUtil = require('../../../src/utils/UploadUtil');
const uploadUtil = new UploadUtil(mockPath);
uploadUtil.multer = mockMulter;

describe('UploadUtil Unit Test', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('storage Method Success', async () => {
    // mockMulter.diskStorage = jest.fn(() => {
    //   return 'test';
    // });
    // const result = uploadUtil.storage;

    // expect(result).toEqual('test');
  });
});
