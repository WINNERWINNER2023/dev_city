'use strict';

class SampleRepository {
  // repository만 예외로 test code를 위해 생성자를 사용한다.
  constructor(model) {
    this.model = model;
  }

  seonghun = (parameter) => {
    console.log('3-1. sample repository - seonghun 메소드');
    console.log('3-2. service에서 전달받은 파라미터: ', parameter);

    console.log('3-3. 전달받은 parameter와 DB를 통해 필요한 활동 수행');

    // ex) const data = this.model.findAll({});

    console.log('3-4. 리턴시킬 데이터를 service로 전달');
    return 'sample repository - seonghun 메소드를 통해 호출한 결과값';
  };
}

module.exports = SampleRepository;
