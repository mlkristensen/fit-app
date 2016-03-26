'use strict';

describe('Sports E2E Tests:', function () {
  describe('Test Sports page', function () {
    it('Should report missing credentials', function () {
      browser.get('http://localhost:3001/sports');
      expect(element.all(by.repeater('sport in sports')).count()).toEqual(0);
    });
  });
});
