import React, { useEffect, useState } from 'react';
import { CurrencyCode } from '../../Models/Currency';
import { Card, Space, Input, Select } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { ExchangeRates } from '../../Models/ExchangeRates';

interface CurrencySelectorProps {
    selectedCurrency: CurrencyCode;
    setSelectedCurrency(code: CurrencyCode): void;
    exchangeRates: ExchangeRates | null;
}

function CurrencySelector({ selectedCurrency, setSelectedCurrency, exchangeRates }: CurrencySelectorProps) {
    const [primaryAmount, setPrimaryAmount] = useState(1);
    const [resultCode, setResultCode] = useState(CurrencyCode.INR);
    const [resultAmount, setResultAmount] = useState(1);

    useEffect(() => {
        if (exchangeRates) {
            const result = primaryAmount * exchangeRates[resultCode];
            console.log(resultCode, exchangeRates[resultCode], primaryAmount);
            setResultAmount(result);
        }
    }, [exchangeRates, resultCode, primaryAmount]);

    return (
        <Card>
            <Space>
                <Input.Group compact>
                    <Select style={{ width: '30%'}} value={selectedCurrency} onSelect={setSelectedCurrency}>
                        {Object.values(CurrencyCode).map(code => (
                            <Select.Option key={code} value={code}>{code}</Select.Option>
                        ))}
                    </Select>
                    <Input
                        value={primaryAmount}
                        onChange={e => setPrimaryAmount(parseInt(e.target.value))}
                        style={{ width: '70%'}} type='number'
                    />
                </Input.Group>
                <Space>
                    <ArrowLeftOutlined />
                    <ArrowRightOutlined />
                </Space>
                <Input.Group compact>
                    <Select style={{ width: '30%'}} value={resultCode} onSelect={setResultCode}>
                        {Object.values(CurrencyCode).map(code => (
                            <Select.Option key={code} value={code}>{code}</Select.Option>
                        ))}
                    </Select>
                    <Input disabled value={resultAmount} style={{ width: '70%'}} type='number'></Input>
                </Input.Group>
            </Space>
        </Card>
    );
}

export default CurrencySelector;
