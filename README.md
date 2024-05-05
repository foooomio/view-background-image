# View Background Image

Chrome extension that adds "View background image" to the context menu

## Installation

[![Available in the Chrome Web Store](https://user-images.githubusercontent.com/1075914/104359656-4698d600-5553-11eb-99d5-2344ac26b544.png)](https://chrome.google.com/webstore/detail/cegndknljaapfbnmfnagomhhgbajjibd)

[![Get the add-on for Firefox](https://user-images.githubusercontent.com/1075914/104359743-64663b00-5553-11eb-8842-81c102a08a1a.png)](https://addons.mozilla.org/firefox/addon/view-background-images/)

[Get the add-on for Microsoft Edge](https://microsoftedge.microsoft.com/addons/detail/lmpgechcgfhfamgjfcipjjpfjoknpccg)

> [!NOTE]
> This extension requires permission to access your data on all websites only for viewing background images.

## Usage

1. Install the extension and **reload tabs**
2. Open the context menu on the images
3. Select "View background image" on it
4. The images under the mouse cursor will be displayed in new tabs

## Known Issues

- [CSS Paint API](https://developers.google.com/web/updates/2018/01/paintapi?hl=en)
- [Closed Shadow DOM](https://developers.google.com/web/fundamentals/web-components/shadowdom?hl=en#closed) (e.g., [Embedded Tweets](https://developer.twitter.com/en/docs/twitter-for-websites/embedded-tweets/overview.html))
- Some inline SVGs

## Contributing

> [!IMPORTANT]
> I need your help to continue to develop and improve the extension.

### Translation

1. Fork this repository
2. Edit `messages.json` in `src/_locales/[localeCode]`
   - If not exists, create a directory according to the [supported locales](https://developer.chrome.com/webstore/i18n?csw=1#localeTable)
3. Create a new pull request

### Donation

- BTC
  - 1NadiwPMU5T8E6UzHSXj8LyLnia6DCyG7q
- ETH
  - 0xF0000Cc3a6A66C25dFADB7761d75053b329CCd5C
  - Major EVM-compatible chains are also acceptable

## License

This software is released under the [MIT License](https://github.com/foooomio/view-background-image/blob/master/LICENSE.txt).

## Author

foooomio - [@foooomio](https://twitter.com/foooomio)
