'use strict';

const SampleService = require('../services/sample.service');

class SampleController {
  sampleService = new SampleService();

  seonghun = async (req, res) => {
    console.log('1-1. sample controller - seonghun 메소드');
    console.log('1-2. req를 통해 프론트엔드에서 전달받은 데이터를 가공하여 service에 전달');
    console.log('1-3. 예시) req.params, req.query, req.body');

    // res.status(222).json({ result: 'controller에서 결과를 뱉음' });

    // controller만 있고 service ~ repository를 만들기 전에 먼저
    // client - server - controller - client의 흐름이 잘 되나 api 테스트 하는걸 추천

    const response = await this.sampleService.seonghun('## controller에서 전달된 파라미터 ##');

    console.log('5-1. sample service의 seonghun을 실행하고 response라는 변수에 결과값을 저장한다.');
    console.log('5-2. 어떤 형태로 전달 받았나, 제대로 왔나 확인 한번쯤은 하자');
    console.log('5-3. response: ', response);

    console.log('5-4. 잘 온 것 같으니 각각 status와 json에 담아 client에 보내준다.');
    res.status(response.code).json({ message: response.message });
  };
}

module.exports = SampleController;
