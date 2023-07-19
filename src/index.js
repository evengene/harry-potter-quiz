import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import './main.css';
import { ROUTES } from './routes/Routes.constants';
import Question from './components/Question/Question';
import Quiz from './components/Quiz/Quiz';
import Result from './components/Result/Result';
import reducer from './reducer';
// import { ChooseLevel } from './components/ChooseLevel/ChooseLevel';

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element:  <Quiz />,
  },
  // {
  //   path: ROUTES.chooseLevel,
  //   element:  <ChooseLevel />,
  // },
  {
    path: ROUTES.questions,
    element: <Question/>,
  },
  {
    path: ROUTES.results,
    element:  <Result />,
  }
]);

const store = createStore(reducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
)
