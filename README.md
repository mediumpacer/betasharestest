# Betashares Search App

This is a search app for fetching and filtering Betashares ETF fund data.

It is recommended to user Node version 22+ for this application.

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

The app can then be accessed at http://localhost:3000/

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Searching using the app

Search results are dynamically generated after a user starts inputting text into the search field.

Autosuggestions are currently generated from this list, this could be improved by a more complete set of terms come from an api also.

- 'Betashares'
- 'Bitcoin'
- 'Exchange'
- 'Funds'
- 'International'
- 'Invest'
- 'Australian'
- 'Thematic'
- 'Sustainability'
- 'Capital growth'
- 'Cybersecurity'
- 'Cloud computing'

Likewise filter options when expanded have been gleaned from the API results, if there are more values needed would look to revise the filter layout into something more vertical and dynamically generate the options.

Pagination is just prev / next functionality, if large datasets were more common adding individual page buttons could be implemented.
