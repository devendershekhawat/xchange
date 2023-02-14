import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import { ConfigProvider, theme, Layout } from 'antd';
import 'antd/dist/reset.css';
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

import './index.scss';

root.render(
    <React.StrictMode>
        <ConfigProvider theme={{
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: '#00b96b',
            },
        }}>

            <Layout>
                <App />
            </Layout>
        </ConfigProvider>
    </React.StrictMode>,
);
