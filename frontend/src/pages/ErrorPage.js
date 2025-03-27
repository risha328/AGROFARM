import React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const error = useRouteError();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-red-50">
            <h1 className="text-4xl font-bold text-red-600">Oops! Something went wrong.</h1>
            <p className="text-lg text-gray-700 mt-2">
                {error?.status === 404
                    ? "Page not found!"
                    : "An unexpected error occurred."}
            </p>
            <a
                href="/"
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
                Go Home
            </a>
        </div>
    );
};

export default ErrorPage;
