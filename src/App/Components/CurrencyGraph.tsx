import React, { useEffect, useState } from 'react';
import {Card, Typography, TableColumnType, Table } from 'antd';
import { Line } from 'react-chartjs-2';
import { CurrencyCode } from '../../Models/Currency';
import { ExchangeRates } from '../../Models/ExchangeRates';

interface CurrencyGraphProps {
    selectedCurrency: CurrencyCode;
    exchangeRates: ExchangeRates | null;
    loading: boolean;
}


function CurrencyGraph({ selectedCurrency, exchangeRates, loading }: CurrencyGraphProps) {
    const [config, setConfig] = useState<{
        labels: Array<string>
        datasets: Array<{
            label: string;
            data: Array<number>;
        }>
    }>({
        labels: [],
        datasets: [{
            label: 'Exchange Rate',
            data: [],
        }],
    });

    useEffect(() => {
        if (exchangeRates) {
            return setConfig({
                labels: Object.keys(exchangeRates),
                datasets: [
                    {
                        label: 'Exchange Rates',
                        data: Object.values(exchangeRates),
                    },
                ],
            });
        }
    }, [exchangeRates]);

    return (
        <Card>
            <Typography.Title level={4}>Exchange Rates Relative to {selectedCurrency}</Typography.Title>
            <Line data={config} />
        </Card>
    );
}

export default CurrencyGraph;
