
angular
  .module('app.store')
    .controller('StoreController', StoreController);

    .controller('StoreController', function($scope, ProductService) {
      var store = this;

      store.products = ProductService.all();
      $scope.products = store.products;






})
