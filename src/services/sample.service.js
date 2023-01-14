'use strict';

const SampleRepository = require('../repositories/sample.repository');
const { modelName } = { modelName: 'Sequelize 모델 불러와야함' };
// 예시) const { User } = require('../sequelize/models');

class SampleService {
  sampleRepository = new SampleRepository(modelName);

  seonghun = async (parameter) => {
    console.log('2-1. sample service - seonghun 메소드');
    console.log('2-2. controller에서 전달받은 파라미터: ', parameter);

    console.log('2-3. sample service - seonghun에 대한 비즈니스 로직을 처리함');

    const data = await this.sampleRepository.seonghun(parameter);
    console.log('4-1. sample repository의 seonghun 메소드를 통해 얻은 결과값에 대해 필요한 로직 처리');
    console.log('4-2. controller로 결과 보내기 - 보통 여기서 프론트에 보내줄 response값을 만들어 전달해주는게 깔끔하다.');

    const response = { code: 222, message: data };
    return response;
  };
}

module.exports = SampleService;
