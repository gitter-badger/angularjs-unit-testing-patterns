(() => {

  'use strict';

  const expect = window.chai.expect,
    inject = window.inject,
    module = window.module,
    sinon = window.sinon;

  describe('Route: userInfo', () => {

    let $location,
      $rootScope,
      $state,
      UserInfoSvc,
      getPets,
      sandbox;

    beforeEach(() => {

      module('app', 'karma.templates');

      sandbox = sinon.sandbox.create();

      inject((
        _$location_,
        _$q_,
        _$rootScope_,
        _$state_,
        _UserInfoSvc_
      ) => {

        $location = _$location_;
        $rootScope = _$rootScope_;
        $state = _$state_;
        UserInfoSvc = _UserInfoSvc_;
        getPets = _$q_.defer();

      });

    });

    afterEach(() => {

      sandbox.restore();

    });

    describe('Initialization', () => {

      let mockData = {
        key: 'value'
      };

      beforeEach(() => {

        sandbox.stub(UserInfoSvc, 'getPets').returns(getPets.promise);
        getPets.resolve(mockData);

      });

      it('should change the state to root.user', () => {

        let expectedState = 'root.user';

        $location.url('/user');
        $rootScope.$apply();

        expect($state.current.name).to.equal(expectedState);

      });

      it('should change the url to "/user"', () => {

        let expectedUrl = '/user';

        $state.go('root.user');
        $rootScope.$apply();

        expect($location.url()).to.equal(expectedUrl);

      });

      it('should resolve the data promise for the route', () => {

        let expectedData = null;

        $rootScope.$on('$viewContentLoading', ($event, $state) => {
          expectedData = $state.locals.data;
        });

        expect(expectedData).to.equal(null);

        $state.transitionTo('root.user');
        $rootScope.$apply();

        expect(expectedData).to.eql(mockData);

      });

    });

  });

})();