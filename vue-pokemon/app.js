var app = new Vue({
    el: '#app',

    data: function () {
        return {
            intro: 'Pokemon finder. Inspired by same projects based on ReactJS and Angular.',
            name: 'slowpoke',
            img: ''
        }
    },
    
    computed: {
        getPokemon: function () {
            this.img = `http://img.pokemondb.net/artwork/${this.name.toLowerCase()}.jpg`;
        }
    }
})
