const initialState = {
  countries: [],
  countries2: [],
  activities: [],
  detail: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_COUNTRIES":
      return {
        ...state,
        countries: action.payload,
        countries2: action.payload,
      };

    case "ORDER_BY_NAME":
      //   let sortedCountries =
      //     action.payload === "asc"
      //       ? state.countries.sort((a, b) => {
      //           // con sort comparo los 2  valores de name y los pone a la derecha o izquierda del arreglo dependiendo si es más grande o más chico
      //           if (a.name > b.name) {
      //             return 1;
      //           }
      //           if (a.name < b.name) {
      //             return -1;
      //           }
      //           return 0;
      //         })
      //       : state.countries.sort((a, b) => {
      //           if (a.name > b.name) {
      //             return -1;
      //           }
      //           if (a.name < b.name) {
      //             return 1;
      //           }
      //           return 0;
      //         });
      //   return {
      //     ...state,
      //     countries: sortedCountries,
      //   };
      const allCountries2 = state.countries;
      const filter2 =
        action.payload === "asc"
          ? allCountries2.sort((a, b) => {
              if (a.name > b.name) {
                return 1;
              }
              if (a.name < b.name) {
                return -1;
              }
              return 0;
            })
          : allCountries2.sort((a, b) => {
              if (a.name > b.name) {
                return -1;
              }
              if (a.name < b.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        countries: filter2,
      };

    case "FILTER_BY_REGION":
      const allCountries = state.countries2;
      const regionFiltered =
        action.payload === "Continents"
          ? allCountries
          : allCountries.filter((el) => el.region === action.payload); //acá llega por payload el valor del select del home
      return {
        ...state,
        countries: regionFiltered,
      };

    case "GET_COUNTRIES_BY_NAME":
      return {
        ...state,
        countries: action.payload,
      };

    case "CREATE_ACTIVITY":
      return {
        ...state,
      };

    case "GET_ACTIVITIES":
      return {
        ...state,
        activities: action.payload,
      };

    case "FILTER_BY_ACTIVITY":
      const paises = state.countries2;
      const hasActivity = paises.filter((e) => e.activities.length !== 0);
      const nuevoArr = hasActivity.filter((e) => {
        for (let i = 0; i < e.activities.length; i++) {
          if (e.activities[i].name === action.payload) return true;
        }
      });
      return {
        ...state,
        countries: nuevoArr,
      };

      case "GET_DETAILS":
        return {
            ...state,
            detail: action.payload,
        };

    default:
      return state;
  }
}
export default rootReducer;
