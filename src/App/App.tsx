import React, { useEffect, useState } from 'react';
import { message, Typography } from 'antd';

import { CurrencyCode } from '../Models/Currency';
import { ExchangeRates } from '../Models/ExchangeRates';

import './App.scss';
import CurrencySelector from './Components/CurrencySelector';
import CurrencyTable from './Components/CurrencyTable';
import { BASE_API_URL } from './Constants/urls';
import CurrencyGraph from './Components/CurrencyGraph';

function App() {
    const [selectedCurrency, setSelectedCurrency] = useState(CurrencyCode.INR);
    const [loading, setLoading] = useState(false);
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates | null>(null);

    useEffect(() => {
        async function getExchangeRates(currencyCode: CurrencyCode) {
            setLoading(true);
            try {
                const response = await fetch(`${BASE_API_URL}/${currencyCode}`);
                const data = await response.json();
                setExchangeRates(data.rates);
            } catch (error) {
                setExchangeRates(null);
                message.error('Error in fetching exchange rates');
            } finally {
                setLoading(false);
            }
        }

        getExchangeRates(selectedCurrency);
    }, [selectedCurrency]);

    return (
        <div className='App'>
            <div className='main'>
                <Typography.Title level={2}>xChange.</Typography.Title>
                <CurrencySelector
                    exchangeRates={exchangeRates}
                    selectedCurrency={selectedCurrency}
                    setSelectedCurrency={setSelectedCurrency}
                /><br/>
                <CurrencyTable
                    loading={loading}
                    exchangeRates={exchangeRates}
                    selectedCurrency={selectedCurrency}
                /><br/>
                <CurrencyGraph
                    loading={loading}
                    exchangeRates={exchangeRates}
                    selectedCurrency={selectedCurrency}
                />
            </div>
        </div>
    );
}

export default App;
