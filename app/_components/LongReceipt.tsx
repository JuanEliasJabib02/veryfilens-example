import React, { useEffect, Dispatch, SetStateAction, useState } from "react";

export interface LongReceiptProps {
  sessionToken: string;
  setImage: Dispatch<SetStateAction<string>>;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

const LongReceipt = ({
  sessionToken,
  setImage,
  setIsEditing,
}: LongReceiptProps) => {

  const [veryfiLens, setVeryfiLens] = useState<{
    startStitching(): void;
    setUserAgent: (arg0: string) => void;
    initWasmLong: (arg0: string) => void;
    startCameraWasm: () => void;
    getSocketStatusColor: () => React.SetStateAction<string>;
    captureLong: (
      arg0: React.Dispatch<React.SetStateAction<string>>,
      arg1: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
  } | null>(null);  
  const [isStitching, setIsStitching] = useState(false)
 
  useEffect(() => {
    const startWasm = async () => {
      if (typeof window !== 'undefined') {
        const lens = require('veryfi-lens-wasm').default;
        lens.setUserAgent(navigator.userAgent);
        await lens.initWasmLong(sessionToken);
        setVeryfiLens(lens);
      }
    }
    startWasm()
  }, []);

  const startStitching = () => {
    if (veryfiLens) {
      veryfiLens.startStitching()
      setIsStitching(true)
    } else {
      console.log('veryfiLens is not initialized')
    }
  };

  const stopStitching = () => {
    if (veryfiLens) {
    veryfiLens.captureLong(setImage, setIsEditing)
    }
  }


  return (
    <div className="h-full">
      <div id="preview-container"
      className="absolute top-[100px] left-[10px] md:left-[40px] w-[22vw] md:w-[18vw] h-[70vh] rounded-md z-40 overflow-y-hidden border-[1px] border-solid border-green-300"
      ></div>
      <div
        className="relative flex justify-center w-full h-full overflow-hidden"
        id="veryfi-container"
      ></div>
      { !isStitching ?(<button
        className="absolute bottom-8 sm:bottom-16 left-0 right-0 ml-auto mr-auto border-4 border-white-600 hover:bg-white/50 rounded-full w-16 h-16 z-50"
        onClick={startStitching}
      />) : <button
      className="absolute bottom-8 sm:bottom-16 left-0 right-0 ml-auto mr-auto border-4 border-white-600 hover:bg-white/50 rounded-full w-16 h-16 z-50"
      onClick={stopStitching}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="red" viewBox="0 0 24 24" strokeWidth={1.5} stroke="none" className="ml-[20%] w-8 h-8">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
        </svg>
      </button>
    }
    </div>
  );
};

export default LongReceipt;
