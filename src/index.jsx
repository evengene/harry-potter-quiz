import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { configureStore } from '@reduxjs/toolkit';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import './main.css';
import { ROUTES } from './routes/Routes.constants';
import Question from './components/Question/Question';
import Result from './components/Result/Result';
import ChooseLevel from './components/ChooseLevel/ChooseLevel';
import LevelPicker from './components/LevelPicker/LevelPicker';
import About from './components/About/About';
import quizReducer from './quizSlice';

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <ChooseLevel />,
  },
  {
    path: ROUTES.chooseLevel,
    element: <LevelPicker />,
  },
  {
    path: ROUTES.questions,
    element: <Question/>,
  },
  {
    path: ROUTES.results,
    element:  <Result />,
  },
  {
    path: ROUTES.about,
    element: <About />,
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
    <SpeedInsights/>
  </Provider>,
)
