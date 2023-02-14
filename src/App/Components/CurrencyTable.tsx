import React, { useEffect, useState } from 'react';
import {Card, Typography, Input, Table } from 'antd';
import { CurrencyCode } from '../../Models/Currency';
import { ExchangeRates } from '../../Models/ExchangeRates';

interface CurrencyTableProps {
    selectedCurrency: CurrencyCode;
    exchangeRates: ExchangeRates | null;
    loading: boolean;
}

const columns = [
    {
        title: 'Currency',
        key: 'code',
        dataIndex: 'code',
    },
    {
        title: 'Rate',
        key: 'rate',
        dataIndex: 'rate',
    },
];

function CurrencyTable({ selectedCurrency, exchangeRates, loading }: CurrencyTableProps) {
    const [dataSource, setDataSource] = useState<Array<{ key: number, code: string, rate: number }>>([]);
    const [filteredData, setFilteredData] =  useState<Array<{ key: number, code: string, rate: number }>>([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (exchangeRates) {
            setDataSource(Object.keys(exchangeRates).map((code, index) => {
                return {
                    key: index,
                    code,
                    rate: exchangeRates[code],
                };
            }));
        }
    }, [exchangeRates]);

    useEffect(() => {
        if (search) {
            setFilteredData(dataSource.filter(data => data.code.includes(search)));
        } else {
            setFilteredData(dataSource);
        }
    }, [search, dataSource]);

    return (
        <Card>
            <Typography.Title level={4}>Exchange Rates Relative to {selectedCurrency}</Typography.Title>
            <Input placeholder='Search' value={search} onChange={e => setSearch(e.target.value)} />
            <Table loading={loading} columns={columns} dataSource={filteredData} />
        </Card>
    );
}

export default CurrencyTable;
