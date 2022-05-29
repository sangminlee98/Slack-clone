import App from '@layouts/App';
import React from 'react';
import {createRoot} from 'react-dom/client'

const root = createRoot(document.querySelector('#app')! as HTMLDivElement);

root.render(<App/>)

