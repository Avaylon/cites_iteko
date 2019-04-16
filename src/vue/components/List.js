export default {
    data() {
        return {
            filterStock: false,
            reverse: false,
            sort: 'name',
        }
    },
    methods: {
        sortByName(a, b) {
            return a.name > b.name ? 1 : a.name < b.name ? -1 : 0
        },
        sortByPrice(a, b) {
            return a.price - b.price
        },
        sorting(name) {
            if (name === this.sort) {
                this.reverse = !this.reverse
            }
            if (name !== this.sort) {
                this.sort = name;
                this.reverse = false
            }
        },
        setCurrProduct(data) {
            this.$store.dispatch('setCurrProduct', data)
        }

    },
    computed: {
        currProductID() {
            return this.$store.getters.currProduct.id
        },
        list() {
            const {filterStock, sortByName, sortByPrice, reverse, $store, sort} = this;

            return $store.getters.list
                .filter((currValue) => (!(filterStock && !currValue.inStock)))
                .sort((a, b) => (sort === 'name' ? sortByName(a, b) : sortByPrice(a, b)))
                .reverseCustom(reverse)
        }

    },
    created() {
        this.$store.dispatch('getList', {});
    },
    template: document.getElementById('List').innerHTML
}