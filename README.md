# Betashares Search App

This is a search app for fetching and filtering Betashares ETF fund data

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

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

Likewise filter options when expanded have been gleaned from the API results, if there are more values needed would look to revise the filter layout into something more vertical.

Pagination is just prev / next functionality, if large datasets were more common adding individual page buttons could be implemented.
