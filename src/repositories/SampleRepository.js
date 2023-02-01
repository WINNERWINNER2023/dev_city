'use strict';

class SampleRepository {
  constructor(model) {
    this.model = model;
  }

  seonghun = (parameter) => {
    // ex) const data = this.model.findAll({});
    return 'sample repository - seonghun 메소드를 통해 호출한 결과값';
  };
}

module.exports = SampleRepository;
