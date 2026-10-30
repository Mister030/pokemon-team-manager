# Pokémon Team Manager

Schoolproject Frontend leerjaar 2, periode 1. Een React-app waarin je Pokémon bekijkt, favorieten bijhoudt en teams maakt.
De data komt uit de [PokéAPI](https://pokeapi.co/).

## Starten

```bash
npm install
npm run dev
```

Open daarna http://localhost:5173.

## Pagina's (routes)

| Route | Pagina | Wat je er doet |
|---|---|---|
| `/` | `Home.jsx` | Welkom, korte uitleg, knop naar de lijst |
| `/list` | `List.jsx` | Alle 151 Pokémon, zoeken, filteren op type, sorteren op naam |
| `/detail/:id` | `Detail.jsx` | Eén Pokémon: naam, type en afbeelding |
| `/favorieten` | `Favorieten.jsx` | Je favoriete Pokémon, met zoeken op naam |
| `/teams` | `Teams.jsx` | Teams maken, hernoemen, verwijderen, Pokémon toevoegen/verwijderen |

## Structuur

```
src/
  main.jsx              startpunt, de app zit in <BrowserRouter>
  App.jsx               routes + favorieten-state
  index.css             alle styling
  components/
    Header.jsx          titel bovenaan
    Navigation.jsx      menu met <Link>
    Footer.jsx          onderkant
    PokemonCard.jsx     herbruikbare kaart (lijst + favorieten)
  pages/
    Home.jsx, List.jsx, Detail.jsx, Favorieten.jsx, Teams.jsx
```

## Waar staat wat uit de opdracht?

| Week | Onderdeel | Waar | Hoe |
|---|---|---|---|
| 1 | Componenten `Header`, `Footer`, `Navigation` | `src/components/` | Losse componenten, gebruikt in `App.jsx` |
| 2 | Routing | `main.jsx`, `App.jsx`, `Navigation.jsx` | `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>` naar Home, List en Detail |
| 3 | Data ophalen | `List.jsx` | `fetch` in `useEffect(..., [])`, data in `useState` |
| 4 | Herbruikbaar component met props | `PokemonCard.jsx` | Props `id`, `name`, `image`; lijst met `.map()` |
| 5 | Detailpagina | `Detail.jsx` | `useParams()` haalt `:id` uit de url, daarna `fetch` |
| 6 | Favorieten | `App.jsx`, `Favorieten.jsx` | `useState` in `App`, doorgeven via props |
| 7 | Teams (CRUD) | `Teams.jsx` | Create, read, update (hernoemen, Pokémon toevoegen/verwijderen) en delete |
| 8 | Filteren, sorteren, max. 6 | `List.jsx`, `Favorieten.jsx`, `Teams.jsx` | `.filter()`, `.sort()`, en een check op `MAX_POKEMON` |
| 9 | Extra: opslaan | `App.jsx`, `Teams.jsx` | `localStorage` + `useEffect`, blijft bewaard na verversen |

## Belangrijke begrippen

- **Component**: een functie die HTML (JSX) teruggeeft, bijvoorbeeld `PokemonCard`.
- **Props**: gegevens die een ouder aan een kind meegeeft: `<PokemonCard name="pikachu" />`.
- **State (`useState`)**: gegevens die kunnen veranderen. Verandert de state, dan tekent React de pagina opnieuw.
- **`useEffect`**: code die na het tekenen draait, bijvoorbeeld data ophalen. De lijst `[]` achteraan bepaalt wanneer het opnieuw draait.
- **`useParams`**: leest een stukje uit de url, zoals het `:id` in `/detail/:id`.
- **Nooit state direct aanpassen**: altijd een nieuwe array maken, met `[...lijst, nieuw]`, `.filter()` of `.map()`.

## Wireframes

Zie [wireframes/](wireframes/README.md) voor vijf schermen als SVG en [PDF](wireframes/wireframes.pdf), met navigatie en revisietoelichting.
