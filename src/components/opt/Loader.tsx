import React, { useState, useEffect } from 'react';

interface LoaderPropsI {
  children: React.JSX.Element;
}

function Loader({ children }: LoaderPropsI): React.JSX.Element {
  const [isMountedBoolSt, setIsMountedBoolSt] = useState<boolean>(false);

  useEffect(() => {
    if (!isMountedBoolSt) {
      setTimeout(() => {
        setIsMountedBoolSt(true);
      }, 500);
    }
  }, []);

  return !isMountedBoolSt ? (
    <div className="w-full min-h-full flex flex-col items-center justify-center">
      <div className="w-lg h-lg text-white">
        <svg
          className="animate-spin -ml-1"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </div>
  ) : (
    children
  );
}
export default Loader;
