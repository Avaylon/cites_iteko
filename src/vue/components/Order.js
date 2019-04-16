export default {
    data() {
        return {
            count: 0
        }
    },
    computed: {
        currProduct() {
            return this.$store.getters.currProduct
        }
    },
    methods: {
        purchase() {
            this.$store.dispatch('purchase', this.$store.getters.currProduct.id);
        }
    },
    template: document.getElementById('Order').innerHTML
}