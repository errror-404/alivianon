import {
  PEDIDO_CREADO,
  PEDIDO_ACTUALIZADO,
  PEDIDO_ELIMINADO,
} from "../actions/PedidoAction";

const initialState = {
  pedido: {},
};

export default function PedidoReducer(state = initialState, action) {
  switch (action.type) {
    case PEDIDO_CREADO:
      return {
        ...state,
        pedido: action.payload,
      };
    case PEDIDO_ACTUALIZADO:
      return {
        ...state,
        pedido: action.payload,
      };
    case PEDIDO_ELIMINADO:
      return {
        ...state,
        pedido: {},
      };
    default:
      return state;
  }
}
