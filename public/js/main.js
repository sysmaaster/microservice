import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
createApp({
  data() {
    return {
      categories: [],
      wallets: [],
      count: 0,
    };
  },
  methods: {
    async newWallet() {
      const data = {
        _id: this._id,
        W_NAME: this.W_NAME,
        SUMMA: this.SUMMA,
        CCY: this.CCY,
        TYPE: this.TYPE,
        SORT_ID: this.SORT_ID,
      };
      const res = await fetch("/wallet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YWRtaW46cXdlcnR5",
        },
        body: JSON.stringify(data),
      });
      const reqWalet = await res.json();
      console.log(reqWalet);
    },
  },
  async mounted() {
   // const res = await fetch("http://localhost:1242/wallet");
   // this.wallets = await res.json();
   // const categories = await fetch("http://localhost:1242/categories");
  //  this.categories = await categories.json();
  },
}).mount("#app");
