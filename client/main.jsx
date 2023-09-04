import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                index: true,
                element: <SearchBooks/>
            },
            {
                path: '/login',
                element: <Login/>,
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/saved',
                element: <SavedBooks/>

            }
        ]
    }
]);