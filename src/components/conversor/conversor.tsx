import React from 'react'

export interface ConversorBRLToUSDProps {

    coinA: string,
    coinB: string,
    type: string,
    quote: string,
    symbol: string
}


class ConversorBRLToUSD extends React.Component<ConversorBRLToUSDProps> {

    state = {

        coinA: this.props.coinA,
        coinB: this.props.coinB,
        quote: this.props.quote,
        symbol: this.props.symbol,
        coinValue: 0 as number,
        coinResult: 0 as number,
        quoteDay: 0 as number,
        type: this.props.type,
        data: {
            Coin: 0 as number,
            CurrencyQuote: 0 as number,
            Type: "" as string
        }
    }

    componentDidMount() {
        this.getQuoteDay()
    }

    getQuoteDay = async () => {

        const { state } = this

        fetch('https://economia.awesomeapi.com.br/json/all').then(resp => resp.json()).then(data => {
            this.setState({ quoteDay: parseFloat(data[state.quote].high) })
        })
    }

    getConversion = async () => {
        const { state } = this

        let coin = parseFloat(state.coinValue.toString())
        let quote = state.quoteDay
        let type = state.type

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ARRAffinity=0b91d554c77a2e6cae448ed7a2f5e5d19cf3ae21b0eeb9d677ca3780c44c75ae; ARRAffinitySameSite=0b91d554c77a2e6cae448ed7a2f5e5d19cf3ae21b0eeb9d677ca3780c44c75ae");

        var raw = JSON.stringify({ "Coin": coin, "CurrencyQuote": quote, "Type": type });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("https://converterservices20201028162911.azurewebsites.net/api/Conversion", requestOptions).then(resp => resp.json()).then(data => {
            this.setState({ coinResult: data.data.convertResult })
        })


    }

    handleChange = (e: any) => {
        this.setState({ coinValue: e.target.value })
    }



    render() {
        const { state } = this
        return (

            <div className="conv">
                <h2>{state.coinA} Para {state.coinB}</h2>
                <input type="text" pattern="[0-9]" placeholder={state.coinA} onChange={this.handleChange.bind(this)} />
                <input className="btn" type="button" value="Converter" onClick={this.getConversion} />
                <h2>{state.symbol} {state.coinResult}</h2>
                <h2>Cotação Atual {state.coinA === "USD" ? "$" : state.coinA === "EUR" ? "€" : state.symbol} {state.quoteDay.toFixed(2)}</h2>
            </div>
        )
    }

}

export default ConversorBRLToUSD