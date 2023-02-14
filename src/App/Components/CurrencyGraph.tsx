import React, { useEffect, useState } from 'react';
import {Card, Typography, TableColumnType, Table } from 'antd';
import { Line } from '@ant-design/charts';
import { CurrencyCode } from '../../Models/Currency';
import { ExchangeRates } from '../../Models/ExchangeRates';

interface CurrencyGraphProps {
    selectedCurrency: CurrencyCode;
    exchangeRates: ExchangeRates | null;
    loading: boolean;
}


function CurrencyGraph({ selectedCurrency, exchangeRates, loading }: CurrencyGraphProps) {
    const [config, setConfig] = useState<{
        data: Array<{
            Currency: string;
            Rate: number;
        }>;
        padding: number | 'auto' | number[] | undefined;
        xField: string;
        yField: string;
    }>({
        data: [],
        padding: 'auto',
        xField: 'Currency',
        yField: 'Rate',
    });

    useEffect(() => {
        if (exchangeRates) {
            return setConfig((prev) => ({
                ...prev,
                data: Object.keys(exchangeRates).map(code => ({
                    Currency: code,
                    Rate: exchangeRates[code],
                })),
            }));
        }
    }, [exchangeRates]);

    return (
        <Card>
            <Typography.Title level={4}>Exchange Rates Relative to {selectedCurrency}</Typography.Title>
            <Line {...config} />
        </Card>
    );
}

export default CurrencyGraph;
