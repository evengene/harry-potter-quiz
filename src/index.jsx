import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Analytics } from '@vercel/analytics/react';

import './main.css';
import { ROUTES } from './routes/Routes.constants';
import Question from './components/Question/Question';
import Quiz from './components/Quiz/Quiz';
import Result from './components/Result/Result';
import quizReducer from './quizSlice';
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

const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
    <Analytics />
  </Provider>,
)
