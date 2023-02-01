'use strict';

const SampleService = require('../services/SampleService');

class SampleController {
  sampleService = new SampleService();

  seonghun = async (req, res) => {
    const response = await this.sampleService.seonghun('## controller에서 전달된 파라미터 ##');
    res.status(response.code).json({ message: response.message });
  };
}

module.exports = SampleController;
