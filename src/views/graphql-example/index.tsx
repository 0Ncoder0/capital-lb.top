import { Vue, Component } from "vue-property-decorator";
import { Properties } from "csstype";
import { requesters } from "@/apollo";
import * as Query from "./query.gen";

const query = Query.getSdk(requesters.query);

@Component
export default class GraphqlExample extends Vue {
  private currencyTo = "CNY";
  private currencyFrom = "USD";
  private rates: Query.GetRatesQuery["rates"] | null = null;

  get rate() {
    return this.rates?.find(rate => rate?.currency === this.currencyTo);
  }

  get styles() {
    return {
      container: {
        fontSize: "16px",
        lineHeight: "24px",
      } as Properties,
      label: {
        marginRight: "12px",
        fontWeight: "bold",
      } as Properties,
    };
  }

  created() {
    setInterval(this.fetch.bind(this), 1000);
  }

  async fetch() {
    const { rates } = await query.GetRates({ currency: this.currencyFrom });
    this.rates = rates;
  }

  render() {
    const { styles, rate, currencyFrom: from, currencyTo: to } = this;
    return (
      <div style={styles.container}>
        <div>
          <span style={styles.label}>FX:</span>
          <span>{`${from}  =>  ${to}`}</span>
        </div>
        <br />
        <div>
          <span style={styles.label}>Rate:</span>
          <span>{rate?.rate || "...loading"}</span>
        </div>
      </div>
    );
  }
}
