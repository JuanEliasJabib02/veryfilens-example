<img src="https://user-images.githubusercontent.com/30125790/212157461-58bdc714-2f89-44c2-8e4d-d42bee74854e.png#gh-dark-mode-only" width="200">
<img src="https://user-images.githubusercontent.com/30125790/212157486-bfd08c5d-9337-4b78-be6f-230dc63838ba.png#gh-light-mode-only" width="200">

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

# Veryfi Lens for Web SDK Demo

Veryfi Lens for Web SDK is a framework for your web app to give it document capture superpowers in minutes.

This project is a demo to showcase how you can integrate Lens into your web app. It follows a client-server architecture where the server is for validating your client and getting session key and the client side is for displaying and showing Lens components for capturing documents.

<img src="flow.png">

There are two ways of using Lens for Web:
1. WebSocket (Only usual receipts, easy to install, slower than WASM)
2. WASM (Usual and Long Receipts, very fast, some devices are not supported)

# WebSocket
1. Import package `import VeryfiLens from 'veryfi-lens-wasm'`
   or `const lens = require('veryfi-lens-wasm').default` inside `useEffect` for next.js
2. Add `id='veryfi-container'` to a div you want lens to appear (it should have full height and hidden overflow)
3. Set your client ID and request a sessionToken (LensScreen.tsx in this demo)  

```
const getVeryfiSession = async (clientId: string) => {
    return await axios
      .post(
        VALIDATE_URL,
        {},
        {
          headers: {
            'CLIENT-ID': clientId,
          },
        }
      )
      .then((response) => {
        console.log(response.data.session);
        setSessionToken(response.data.session);
      })
      .catch((error) => error);
  }
```

For usual receipt
```
 const [veryfiLens, setVeryfiLens] = useState<VeryfiLens | null>(null);

  useEffect(() => {
    let intervalRef: number | undefined;
    if (typeof window !== 'undefined') {
      const startLens = async () => {
        const lens = require('../../utils/lens-web-sdk/veryfi-lens').default;
        lens.init(sessionToken);
        setVeryfiLens(lens);
        intervalRef = window.setInterval(() => {
          setSocketStatusColor(lens.getSocketStatusColor());
        }, SOCKET_STATUS_UPDATE_INTERVAL);
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
```

# WASM
**_You can skip first step and copy wasm folder from package directory manually if you want to do so_.**

1. run `npm exec veryfi-lens-wasm-setup` and provide it with path to directory where
   **they have to be accessible from your project's entry point with relative paths** (for next.js `public/wasm`)
2. Import package `import VeryfiLens from 'veryfi-lens-wasm'`
   or `const lens = require('veryfi-lens-wasm').default` inside `useEffect` for next.js
3. Add `id='veryfi-container'` to a div you want lens to appear (it should have full height and hidden overflow)

For usual receipt

```
 const [veryfiLens, setVeryfiLens] = useState<{
    setUserAgent: (arg0: string) => void;
    initWasm: (arg0: string) => void;
    startCameraWasm: () => void;
    captureWasm: (
      arg0: React.Dispatch<React.SetStateAction<string>>,
      arg1: React.Dispatch<React.SetStateAction<boolean>>
    ) => void;
  } | null>(null);  

  useEffect(() => {
    const startWasm = async () => {
      if (typeof window !== 'undefined') {
        const lens = require('veryfi-lens-wasm').default;
        lens.setUserAgent(navigator.userAgent);
        await lens.initWasm(sessionToken);
        setVeryfiLens(lens);
      }
    }
    startWasm()
  }, []);

  const takePhoto = () => {
    if (veryfiLens) {
      veryfiLens.captureWasm(setImage, setIsEditing)
    } else {
      console.log('veryfiLens is not initialized')
    }
  };
// setImage is cropped image setter(for example react's useState hook), returns string
// setIsEditing returns `true` if image was succesfully cropped (we use it to change screens)
```

For Long receipt
Add container with id="preview-container" to see stitching preview
```
<div id="preview-container"
      className="absolute top-[100px] left-[10px] md:left-[40px] w-[22vw] md:w-[18vw] h-[70vh] rounded-md z-40 overflow-y-hidden border-[1px] border-solid border-green-300"
      ></div>
```
```
 const [veryfiLens, setVeryfiLens] = useState<{
    startStitching(): void;
    setUserAgent: (arg0: string) => void;
    initWasmLong: (arg0: string) => void;
    startCameraWasm: () => void;
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

// Start button
const startStitching = () => {
  if (veryfiLens) {
    veryfiLens.startStitching();
    setIsStitching(true);
  } else {
    console.log("veryfiLens is not initialized");
  }
};

// Stop button
const stopStitching = () => {
  if (veryfiLens) {
    veryfiLens.captureLong(setImage, setIsEditing);
  }
};
```

To use wasm in dev environment, you have to use https and ssl
If using Next.js add following to next.config.js:

```
 async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          }
        ]
      }
    ]
  },

webpack: (config) => {
  config.resolve.fallback = { fs: false, path:false, "crypto": false };
  return config;
},
```# veryfilens-example
