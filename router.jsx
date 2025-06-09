import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import Home from "./src/modules/home"
import ExamPage from './src/modules/exams';
import LoginPage from './src/modules/login';
import YearSelection from './src/modules/yearSelection';
import SubjectSelection from './src/modules/subjectSelection';

export const router = createBrowserRouter([
  {
      path:"/",
      element: <Home />
  },
  {
    path:"/exams",
    element: <ExamPage />
},
  {
    path:"/login",
    element: <LoginPage />
},
  {
    path:"/yearSelection",
    element: <YearSelection />
},
  {
    path:"/subjectSelection",
    element: <SubjectSelection />
},
])
