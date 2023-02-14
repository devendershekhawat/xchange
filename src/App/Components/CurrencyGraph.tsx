import React, { useEffect, useState } from 'react';
import {Card, Typography } from 'antd';
import { CurrencyCode } from '../../Models/Currency';
import { ExchangeRates } from '../../Models/ExchangeRates';
import { Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

interface CurrencyGraphProps {
    selectedCurrency: CurrencyCode;
    exchangeRates: ExchangeRates | null;
    loading: boolean;
}


function CurrencyGraph({ selectedCurrency, exchangeRates, loading }: CurrencyGraphProps) {
    const [config, setConfig] = useState<Array<{Currency: string; Rate: number }>>([]);

    useEffect(() => {
        if (exchangeRates) {
            setConfig(Object.keys(exchangeRates).map(code => ({
                Currency: code,
                Rate: exchangeRates[code],
            })));
        }
    }, [exchangeRates]);

    return (
        <Card>
            <Typography.Title level={4}>Exchange Rates Relative to {selectedCurrency}</Typography.Title>
            <LineChart width={600} height={500} data={config}>
                <Tooltip />
                <Line type="monotone" dataKey="Rate" stroke='#8884d8' />
                <XAxis dataKey="Currency"></XAxis>
                <YAxis></YAxis>
            </LineChart>
        </Card>
    );
}

export default CurrencyGraph;
