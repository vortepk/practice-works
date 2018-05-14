// register the grid component
Vue.component('demo-grid', {
  template: '#grid-template',
  props: {
    data: Array,
    columns: Array,
    filterKey: String
  },
  data: function () {
    var sortOrders = {}
    this.columns.forEach(function (key) {
      sortOrders[key] = 1
    })
    return {
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

Vue.component('modal', {
  template: '#modal-template'
})

// bootstrap the demo
var demo = new Vue({
  el: '#demo',
  data: {
    person: { id: 5, name: '', surname: '', age: '' },
    searchQuery: '',
    errors: [],
    showModal: false,
    gridColumns: ['id', 'name', 'surname', 'age'],
    gridData: [
      { id: 1, name: 'Chuck', surname: 'Norris', age: 72 },
      { id: 2, name: 'Bruce', surname: 'Lee', age: 27 },
      { id: 3, name: 'Jackie', surname: 'Chan', age: 34 },
      { id: 4, name: 'Napoleon', surname: 'Bonaparte', age: 21 }
    ]
  },
  methods: {
    addPerson: function (e_name, e_surname) {
      this.gridData.push({
        id: this.person.id++,
        name: e_name[0].toUpperCase() + e_name.slice(1),
        surname: e_surname[0].toUpperCase() + e_surname.slice(1),
        age: Math.floor(Math.random() * (70 - 21)) + 21
      });
    },
    checkInputs: function (e) {
      if(this.person.name && this.person.surname) this.addPerson(this.person.name, this.person.surname);
      this.errors = [];
      if(!this.person.name) this.errors.push("Требуется указать имя.");
      if(!this.person.surname) this.errors.push("Требуется указать фамилию.");
      e.preventDefault();
    }
  }
})