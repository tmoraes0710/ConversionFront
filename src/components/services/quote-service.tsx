import Axios from 'axios'
import React from 'react'

class QuoteService {

    static getQuote = async () => {

        let { data } = await Axios.get(`${window.quoteService.read}`);

        return data;
    }


}

export default QuoteService