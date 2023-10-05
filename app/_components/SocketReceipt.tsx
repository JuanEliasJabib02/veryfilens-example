import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Indicator from "./Indicator";

interface VeryfiLens {
  setUserAgent: (arg0: string) => void;
  init: (arg0: string) => void;
  startCamera: () => void;
  getSocketStatusColor: () => React.SetStateAction<string>;
  capture: (
    arg0: React.Dispatch<React.SetStateAction<string>>,
    arg1: React.Dispatch<React.SetStateAction<boolean>>
  ) => void;
}
export interface LensComponentProps {
  sessionToken: string;
  setImage: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const SOCKET_STATUS_UPDATE_INTERVAL = 250;

const LensComponent = ({
  sessionToken,
  setImage,
  setIsEditing,
}: LensComponentProps) => {

  const [socketStatusColor, setSocketStatusColor] = useState("purple");
  const [veryfiLens, setVeryfiLens] = useState<VeryfiLens | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    let intervalRef: number | undefined;
    if (typeof window !== 'undefined') {
      const startLens = async () => {
        const lens = require('veryfi-lens-wasm').default;
        lens.init(sessionToken);
        intervalRef = window.setInterval(() => {
          setSocketStatusColor(lens.getSocketStatusColor());
        }, SOCKET_STATUS_UPDATE_INTERVAL);
        setVeryfiLens(lens);
      }
      startLens();
    }
    return () => {
      clearInterval(intervalRef);
    };
  }, [sessionToken]);

  const takePhoto = () => {
    if (veryfiLens) {
      veryfiLens.capture(setImage, setIsEditing)
    } else {
      setError('veryfiLens is not initialized');
    }
  };

  return (
    <div className="h-full">
      <div
        className="relative flex justify-center w-full h-full overflow-hidden"
        id="veryfi-container"
      />
      {error && <div className="error">{error}</div>}
      <button
        className="absolute bottom-8 sm:bottom-16 left-0 right-0 ml-auto mr-auto border-4 border-white-600 hover:bg-white/50 rounded-full w-16 h-16 z-50"
        onClick={takePhoto}
      />
      <Indicator
        color={socketStatusColor}
        borderColor="gray"
        size="small"
        additionalCss="absolute top-4 right-2 z-30"
      />
    </div>
  );
};

export default LensComponent;
