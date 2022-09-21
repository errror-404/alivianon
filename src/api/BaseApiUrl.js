import axios from "axios";

export const BaseApiUrl = axios.create({
  baseURL: "https://alivianon.herokuapp.com/users/",
});

export const VendedoresApiUrl = axios.create({
  baseURL: "https://alivianon.herokuapp.com/vendedores/",
});

export const ArticulosApiUrl = axios.create({
  baseURL: "https://alivianon.herokuapp.com/articulos/",
});

export const PedidosApiUrl = axios.create({
  baseURL: "https://alivianon.herokuapp.com/pedidos/",
});

export const StripeApiUrl = axios.create({
  baseURL: "https://alivianon.herokuapp.com/stripe/",
});
