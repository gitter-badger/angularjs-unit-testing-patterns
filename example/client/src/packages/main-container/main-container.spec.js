(() => {

  'use strict';

  const angular = window.angular,
    expect = window.chai.expect,
    inject = window.inject,
    module = window.module,
    sinon = window.sinon;

  describe('Package: MainContainer', () => {

    let $compile,
      $scope,
      MainContainerEl,
      sandbox;

    beforeEach(() => {

      module('app', 'karma.templates');

      sandbox = sinon.sandbox.create();

      inject((_$compile_, _$rootScope_) => {

        $compile = _$compile_;

        $scope = _$rootScope_.$new();

      });

      MainContainerEl = angular.element('<main-container></main-container>');

      $compile(MainContainerEl)($scope);
      $scope.$apply();

    });

    afterEach(() => {

      sandbox.restore();

    });

    it('should contain a section that has the "mainContent" view', () => {

      let expectedView = 'mainContent',
        uiViewAttr = MainContainerEl[0].querySelector('section').getAttribute('ui-view');

      expect(uiViewAttr).to.be.equal(expectedView);

    });

  });

})();
