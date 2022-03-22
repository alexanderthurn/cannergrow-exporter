# cannergrow-exporter

Browser Plugin to download your transactions from Cannergrow to create a tax report or calculate your net return

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

Chrome (Not yet available):
- Open the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions)
- Install the plugin

Firefox (Not yet available):
- Open the [Firefox Web Store](https://addons.mozilla.org/en-GB/firefox/addon/cannergrow-exporter/)
- Install the plugin

## Usage

- Make sure the plugin is installed (seeing the WH icon on the top right. If there is no icon, click on the icon looking like a puzzle and there click the "Pin" icon for this plugin)
- Make sure you are registered on [Cannergrow](https://cannergrow.com/r/XJ7QY3)
- Open your dashboard in [Cannergrow](https://cannergrow.com/r/XJ7QY3)
- Click on the "Start sync" button on the left in the menu "Werteherren"
- Wait for the sync to finish. Then you can download the JSON
- Optional: Make an account on [werteherren.de](https://werteherren.de) - It is 100% free and you can use the net return calculator even without being in the team

## Development

### Firefox

Firefox only supports v2 of plugins, v3 is activated per default so you need to:

- Go to src/
- Rename manifest.json to manifestv3.json
- Rename manifestv2.json to manifest.json

- Go to [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox)
- Click on "Load Temporary Add-On"
- Select any file within this directory (e.g. manifest.json)

### Chrome

- Go to [chrome://extensions/](chrome://extensions/)
- Activate Developer Mode if not yet done
- Click on "Load unpacked extension"
- Select this directory

### Edge

- Go to [edge://extensions/](edge://extensions/)
- Activate Developer Mode if not yet done
- Click on "Load unpacked extension"
- Select this directory

### Opera
- Go to [opera://extensions](opera://extensions)
- Activate Developer Mode if not yet done
- Click on "Load unpacked extension"
- Select this directory


## Support

Please [open an issue](https://github.com/alexanderthurn/cannergrow-exporter/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/alexanderthurn/cannergrow-exporter/compare/)


## TODO

* Good description
* Better error handling

## Permissions

* Storage: The storage permission is needed, as the data can become quite large depending on how many transactions are available. The second reason is that there is a convience functionality where you as a user can insert the data on a calculator and summarize tool on the werteherren.de website (Keeps you from downloading the data and uploading it there)

## License
 
The MIT License (MIT)

Copyright (c) 2022 Alexander Thurn

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



