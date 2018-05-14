Vue.component('modal', {
    template: '#modal-template'
})

Vue.component('ticket-list', {
    template: '\
    <li>\
      {{ field1 }} / {{ field2 }}\
    </li>\
  ',
    props: ['field1', 'field2']
})

Vue.filter('highlight', function (words, query) {
    return words.replace(query, '<span class=\'highlight\'>' + query + '</span>')
})

var app = new Vue({
    el: '#app',

    data: function () {
        return {
            selected: '1',
            showModal: false,
            id: 0,
            tickets: [],
            winTicket: [],
            isGenerated: false,
            isPlayed: false,
        }
    },

    methods: {
        generateNumbers: function () {
            var numbers = [];
            while (numbers.length < 4) {
                var randomNumber = Math.floor(Math.random() * 20) + 1;
                if (numbers.indexOf(randomNumber) > -1) continue;
                numbers[numbers.length] = randomNumber;
            }
            console.log(numbers);
            var ticket = numbers.map(function (name) {
                return ('0' + name).slice(-2);
            });
            return ticket.join("-");
        },
        newTickets: function () {
            this.pushTickets(parseInt(this.selected));
            this.isGenerated = true;
        },
        pushTickets: function (times) {
            for (var i = 0; i < times; i++) {
                this.tickets.push({
                    id: this.id++,
                    field1: this.generateNumbers(),
                    field2: this.generateNumbers()
                });
            }
        },
        playLottery: function () {
            this.winTicket.push({
                field1: this.generateNumbers(),
                field2: this.generateNumbers()
            });
            this.isPlayed = true;

            for (var i = 0; i < this.tickets.length; i++) {
                this.tickets[i].field1 = this.makeOverlap(this.tickets[i].field1, this.winTicket[0].field1);
                this.tickets[i].field2 = this.makeOverlap(this.tickets[i].field2, this.winTicket[0].field2);
            }
        },
        makeOverlap: function (mo_ticket, mo_win) {
            var marked = mo_ticket;

            mo_win.split('-').forEach(
                function (num) {
                    return marked = marked.replace(num, 'XX');
                }
            );

            return marked;
        }
    }
})