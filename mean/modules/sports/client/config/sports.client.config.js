(function () {
  'use strict';

  angular
    .module('sports')
    .run(menuConfig);

  menuConfig.$inject = ['Menus'];

  function menuConfig(Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', {
      title: 'Sports',
      state: 'sports',
      type: 'dropdown',
      roles: ['admin']
    });

    // Add the dropdown list item
    Menus.addSubMenuItem('topbar', 'sports', {
      title: 'List Sports',
      state: 'sports.list'
    });

    // Add the dropdown create item
    Menus.addSubMenuItem('topbar', 'sports', {
      title: 'Create Sport',
      state: 'sports.create',
      roles: ['admin']
    });
  }
})();
