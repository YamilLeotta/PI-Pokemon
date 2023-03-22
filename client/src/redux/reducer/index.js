//import * as aT from "../actions";

const initialState = {
  types: null, // [{idDB, name}, {idDB, name}, {idDB, name}]
  typesFilter: null, // [{idDB, name}, {idDB, name}, {idDB, name}]
  order: null,
  ipp: 12,
  apiRegs: 40, // 0 if apiRegs disabled
  ownRegs: true,
  loading: true,
};

const rootReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case 'SET_LOADING': return {...state, loading: payload};
    case 'GET_TYPES': return {...state, types: payload};
    case 'SET_TYPES_FILTER': return {...state, typesFilter: payload};
    case 'SET_ORDER': return {...state, order: payload};
    case 'SET_IPP': return {...state, ipp: payload};
    case 'SET_API_REGS': return {...state, apiRegs: payload};
    case 'SET_OWN_REGS': return {...state, ownRegs: payload};
    default: return {...state};
  }
};

export default rootReducer;
