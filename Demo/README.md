# Demo

## Installation & Setup

1. Clone this repo or copy everything in this directory (demo/)
2. Make sure you have Python3 and node.js installed 
3. The detection server requires TensorFlow + ImageAI to be installed. This process can be annoying, and Lou already has them installed so I won't explain how to do this.
4. Navigate to demo/TipOfMyShoe/ and run `npm install`
5. This app uses [Expo](https://expo.io/) for rapid prototyping. Download Expo from either the App Store/Play Store on your phone.
6. Figure out your computer's local IP. On Linux/mac you can use `ifconfig | grep inet` and it'll be the one that starts with 192. You then need to edit /demo/TipOfMyShoe/screens/ResultScreen.js and replace the IP address in line 43 with the one you just found. Keep the :5000 at the end, along with all the other parts of the string. Just replace the IP address. I know this is shit design, sorz.
6. Navigate to /demo/TipOfMyShoe/ and run `npm start` to start the Expo server. You can then open the Expo app on your phone, scan the barcode that you'll see on your computer, and the app will be loaded.
7. Start the detection server by navigating to /demo/DetectionServer/detection_server/server and running `python server.py`. Depending on your OS it might be `python3 server.py` instead.
8. The app should now be working. There's currently a bug with how the server calls imageai, basically you have to restart the detection server every time you match a shoe. I.e. during the demo, if you take a picture of your shoes in the app and it matches them, restart the detection server before you take another picture.

