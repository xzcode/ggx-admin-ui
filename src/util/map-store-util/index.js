import { createNamespacedHelpers } from "vuex";

const mapStore = function(storeModules) {
  const {
        mapState,
        mapMutations,
        mapGetters,
        mapActions
    } = createNamespacedHelpers(storeModules);
  const store = require("@/views/" + storeModules + "/store").default;
  if (!store) {
    return {};
  }
  return {
    computed: {
      ...mapState(Object.keys(store.state || []))
    },
    methods: {
      ...mapMutations(Object.keys(store.mutations || [])),
      ...mapGetters(Object.keys(store.getters || [])),
      ...mapActions(Object.keys(store.actions || []))
    }
  };
};
export default mapStore;
