
angular
  .module('app.service', [])
    .factory('ProductService', ProductService);
/* 
*  @AppController
*/
function ProductService() {
  var productTypes =
      [
        {
            id: 0,
            title: "Uncivilized Charades Black T-Shirt",
            price: "20.00",
            color: "Black",
            size: "Medium",
            description: "Show the world how Uncivilized you really are with you brand new Uncivilized Charades t-shirt!",
            count: 10,
            image: "img/product-images/unciv-chara-tshirt-black-01.png"
        }, {
            id: 1,
            title: "Uncivilized Charades White T-Shirt",
            price: "20.00",
            color: "White",
            size: "Medium",
            description: "Show the world how Uncivilized you really are with you brand new Uncivilized Charades t-shirt!",
            count: 15,
            image: "img/product-images/unciv-chara-tshirt-black-01.png"
        }
      ];

      var activeProduct = productTypes[0]; //initialize with 0

      function setActiveProduct(index) {
          activeProduct = productTypes[index];
          console.log('activeProduct is now ' + activeProduct)
      }
      return {
        all: function() {
          return productTypes;
        },
        remove: function(product) {
          products.splice(products.indexOf(product), 1);
        },
        activeProduct: function() {
          return activeProduct;
        },
        getActiveProduct: function(index) {
          setActiveProduct(index);
          console.log(activeProduct);
        },
        get: function(productId) {
          for (var i = 0; i < products.length; i++) {
            if (product[i].id === parseInt(productId)) {
              return products[i];
            }
          }
          return null;
        } // get:
    };
}; 