'use strict';

const SampleRepository = require('../repositories/SampleRepository');
const { modelName } = { modelName: 'Sequelize 모델 불러와야함' };
// 예시) const { User } = require('../sequelize/models');

class SampleService {
  sampleRepository = new SampleRepository(modelName);

  seonghun = async (parameter) => {
    const data = await this.sampleRepository.seonghun(parameter);
    const response = { code: 222, message: data };
    return response;
  };
}

module.exports = SampleService;
