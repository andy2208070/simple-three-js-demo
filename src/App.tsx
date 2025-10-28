// import { useState } from 'react'
// import Demo1 from './pages/demo1/demo1';
// import TeapotDemo from './pages/demo2/demo2';
import { BrowserRouter, /*Routes, Route, Link,*/ useRoutes } from 'react-router-dom';
import { routesConfig } from './utils/routes';
import { Suspense } from 'react';
import AppLayout from './components/AppLayout';

function AppRouteContent () {
  const routes = useRoutes(routesConfig);
  return (
    <AppLayout>
      <Suspense fallback={<div className="p-8 text-center">載入中...</div>}>
        {routes}
      </Suspense>
    </AppLayout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRouteContent />
    </BrowserRouter>
  );
}

export default App
