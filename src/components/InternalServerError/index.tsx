const InternalServerError = ( ) => {
    
    const  errorCode = 500;
    const errorMessage="Bad Gateway"
  return (
    <div className="bg-gray-100 flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-red-600">{errorCode}</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mt-4">{errorMessage}</h2>
        <p className="text-gray-600 mt-2">
          Oops! Something went wrong on our end. We are working to fix it.
        </p>
        <p className="text-gray-600 mt-2">Please try again later or contact support.</p>
        <a
          href="/"
          className="mt-6 inline-block px-6 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-500 transition-all"
        >
          Go Back Home
        </a>
        <div className="mt-4 text-sm text-gray-500">
          <p>Error Code: <span className="font-semibold">{errorCode}</span></p>
          <p>Error Details: <span className="italic">{errorMessage}</span></p>
        </div>
      </div>
    </div>
  );
};

export default InternalServerError;
