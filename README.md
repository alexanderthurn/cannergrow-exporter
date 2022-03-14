# cannergrow-exporter

Cannergrow Exporter - Chrome Browser Plugin to download all your data from Cannergrow (plants, team, transactions) as a json, e.g. to create a tax report or calculate net return

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Support](#support)
- [Contributing](#contributing)

## Installation

- Use Chrome (Firefox not supported yet due to manifest v3)
- Open the [Chrome Web Store](https://chrome.google.com/webstore/category/extensions)
- Install the plugin

## Usage

- Make sure the plugin is installed (seeing the WH icon on the top right. If there is no icon, click on the icon looking like a puzzle and there click the "Pin" icon for this plugin)
- Make sure you are registered on [Cannergrow](https://cannergrow.com/r/XJ7QY3)
- Open your dashboard in [Cannergrow](https://cannergrow.com/r/XJ7QY3)
- Click on the plugin icon and then on "Synchronize"
- Wait for the sync to finish. Then you can download the JSON
- Optional: Make an account on [werteherren.de](https://werteherren.de) - It is 100% free and you can use the net return calculator even without being in the team

## Development

Firefox: 

- Warning: As the time i am writing this, Firefox does not support the manifest v3 so this extension does not work. 
- Go to about:debugging#/runtime/this-firefox
- Click on "Load Temporary Add-On"
- Select any file within this directory (e.g. manifest.json)

Chrome:

- Go to chrome://extensions/
- Activate Developer Mode if not yet done
- Click on "Load unpacked extension"
- Select this directory

## Support

Please [open an issue](https://github.com/alexanderthurn/cannergrow-exporter/issues/new) for support.

## Contributing

Please contribute using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/alexanderthurn/cannergrow-exporter/compare/)


## TODO

* Check login while surfing cannergrow
* Better percentage while loading data (layer / length)
* Add safe check if data needs to be updated
* Faster data loading for team (parallel?)
* Better Rendite-Prognose calculator
* Warning Sign: ⚠
