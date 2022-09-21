const PEDIDO_CREADO = "PEDIDO_CREADO";
const PEDIDO_ACTUALIZADO = "PEDIDO_ACTUALIZADO";
const PEDIDO_ELIMINADO = "PEDIDO_ELIMINADO";

export const pedidoCreado = (pedido) => {
  return {
    type: PEDIDO_CREADO,
    payload: pedido,
  };
};

export const pedidoActualizado = (pedido) => {
  return {
    type: PEDIDO_ACTUALIZADO,
    payload: pedido,
  };
};

export const pedidoEliminado = (pedido) => {
  return {
    type: PEDIDO_ELIMINADO,
    payload: pedido,
  };
};

export const crearPedido = (pedido) => {
  return async (dispatch) => {
    try {
      dispatch(pedidoCreado(pedido));
    } catch (error) {
      console.log(error);
    }
  };
};

export const actualizarPedido = (pedido) => {
  return async (dispatch) => {
    try {
      dispatch(pedidoActualizado(pedido));
    } catch (error) {
      console.log(error);
    }
  };
};

export const eliminarPedido = (pedido) => {
  return async (dispatch) => {
    try {
      dispatch(pedidoEliminado(pedido));
    } catch (error) {
      console.log(error);
    }
  };
};
