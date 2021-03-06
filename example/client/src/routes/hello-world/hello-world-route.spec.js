(() => {

  'use strict';

  const expect = window.chai.expect,
    inject = window.inject,
    module = window.module,
    sinon = window.sinon;

  describe('Route: helloWorld', () => {

    let $location,
      $scope,
      $state,
      sandbox;

    beforeEach(() => {

      module('app', 'karma.templates');

      sandbox = sinon.sandbox.create();

      inject((
        _$location_,
        _$rootScope_,
        _$state_
      ) => {

        $location = _$location_;
        $scope = _$rootScope_.$new();
        $state = _$state_;

      });

    });

    afterEach(() => {

      sandbox.restore();

    });

    it('should change the state to root.helloWorld', () => {

      let expectedState = 'root.helloWorld';

      $location.url('/hello-world');
      $scope.$apply();

      expect($state.current.name).to.equal(expectedState);

    });

    it('should change the url to "/hello-world"', () => {

      let expectedUrl = '/hello-world';

      $state.go('root.helloWorld');
      $scope.$apply();

      expect($location.url()).to.equal(expectedUrl);

    });

  });

})();
