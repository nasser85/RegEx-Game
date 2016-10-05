module.exports = function ($httpProvider) {
  $httpProvider.interceptors.push([
      '$injector',
      function ($injector) {
          return $injector.get('AuthInterceptor');
      }
  ]);
};
