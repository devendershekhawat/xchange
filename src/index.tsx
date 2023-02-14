import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App/App';
import { ConfigProvider, theme, Layout } from 'antd';

const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement);

import './index.scss';

root.render(
    <React.StrictMode>
        <ConfigProvider theme={{
            algorithm: theme.defaultAlgorithm,
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
