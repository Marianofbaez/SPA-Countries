import axios from "axios";

export function getCountries() {
  return async function (dispatch) {
    // ACÁ ES DONDE SE CONECTA EL BACK Y EL FRONT
    var json = await axios.get("/countries");
    return dispatch({
      type: "GET_COUNTRIES",
      payload: json.data,
    });
  };
}

export function orderByName(payload) {
  return {
    type: "ORDER_BY_NAME",
    payload,
  };
}

export function filterCountryByRegion(payload) {
  console.log(payload);
  return {
    type: "FILTER_BY_REGION",
    payload,
  };
}

export function getCountryByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        "/countries?name=" + name
      );
      return dispatch({
        type: "GET_COUNTRIES_BY_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function createActivity(payload) {
  // return async function (dispatch){
  //     var response = await axios.post(`http://localhost:3001/activities`, payload)
  //     console.log (response)
  //     return response
  // }
  return function (dispatch) {
    return axios.post(`/activities`, payload);
  };
}

export function getActivities() {
  return async function (dispatch) {
    var json = await axios.get("/activities");
    return dispatch({
      type: "GET_ACTIVITIES",
      payload: json.data,
    });
  };
}

export function filterByActivity(payload) {
  return {
    type: "FILTER_BY_ACTIVITY",
    payload,
  };
}

export function getDetail(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`/countries/${id}`);
      return dispatch({
        type: "GET_DETAILS",
        payload: json.data
      });
    } catch (error) {
      console.log(error);
    }
  };
}
