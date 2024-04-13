const Front = {
  data() {
    return {
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
    const res = await fetch("/wallet");
    this.wallets = await res.json();
  },
};

Vue.createApp(Front).mount("#front");
