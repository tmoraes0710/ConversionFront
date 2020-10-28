import React from 'react'
import BaseService from '../services/base-service'

const baseService = new BaseService();

class ConversorBRLToUSD extends React.Component {

    state = {
        nameA: "BRL" as string,
        nameB: "USD" as string,
        coinValue: 0 as number,
        coinResult: 0 as number,
        quoteDay: 0 as number,
        type: "BRLTOUSD" as string,
    }

    componentDidMount() {
        this.getQuoteDay()
    }

    getQuoteDay = async () => {

        fetch('https://economia.awesomeapi.com.br/json/all').then(resp => resp.json()).then(data => {
            this.setState({ quoteDay: parseFloat(data[this.state.nameB].high).toFixed(2) })
        })
    }

    getConversion = async () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Cookie", "ARRAffinity=0b91d554c77a2e6cae448ed7a2f5e5d19cf3ae21b0eeb9d677ca3780c44c75ae; ARRAffinitySameSite=0b91d554c77a2e6cae448ed7a2f5e5d19cf3ae21b0eeb9d677ca3780c44c75ae");

        var raw = JSON.stringify({ "Coin": this.state.coinValue, "currencyQuote": this.state.quoteDay, "Type": this.state.type });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
        };

        fetch("https://converterservices20201028162911.azurewebsites.net/api/Conversion", requestOptions).then(resp => resp.json()).then(data => {
            this.setState({ coinResult: parseFloat(data.data.convertResult).toFixed(2) })
        })
    }

    handleChange = (event: { target: { value: any; }; }) => {
        this.setState({ coinValue: event?.target.value })
    }



    render() {
        return (

            <div className="conversor">
                <h2>{this.state.nameA} Para {this.state.nameB}</h2>
                <input type="text" value={this.state.coinValue} placeholder={this.state.nameA?.toString()} onChange={this.handleChange} />
                <input type="button" value="Converter" onClick={this.getConversion} />
                <h2>R$ {this.state.coinResult}</h2>
            </div>
        )
    }

}

export default ConversorBRLToUSD