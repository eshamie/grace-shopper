import axios from 'axios'

//  STATE

const initialState = {
  products: [],
  product: {}
}

// ACTION TYPE CONSTANT

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

// ACTION CREATORS

const getProducts = products => {
  return {
    type: GET_PRODUCTS,
    products
  }
}

const getProduct = product => {
  return {
    type: GET_PRODUCT,
    product
  }
}

const addProduct = product => {
  return {
    type: ADD_PRODUCT,
    product
  }
}

const removeProduct = product => {
  return {
    type: REMOVE_PRODUCT,
    product
  }
}

const editProduct = product => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

// THUNKS

export const fetchProducts = () =>
  dispatch =>
  axios.get('/api/products')
  .then(res => res.data)
  .then(products => {
    dispatch(getProducts(products))
  })

export const fetchProduct = (productId) =>
  dispatch => {
    return axios.get(`/api/products/${productId}`)
    .then(res => res.data)
    .then(product => {
      dispatch(getProduct(product))
    })
}

export const postProduct = product =>
  dispatch => {
  console.log(product)
  return axios.post('/api/products', product)
  .then(res => res.data)
  .then(newProduct => {
    dispatch(addProduct(newProduct))
  })
}

export const deleteProduct = productId =>
  dispatch => {
  return axios.delete(`/api/products/${productId}`)
  .then(res => res.data)
  .then((product) => {
    dispatch(removeProduct(product))
  })
}

export const updateProduct =  (product, productId) => dispatch => {
  console.log(product)
    return axios.put(`/api/products/edit/${productId}`, product)
      .then(res => res.data)
      .then(updatedProduct => {
        dispatch(editProduct(updatedProduct))
      })
}

// REDUCER

export default function reducer(state=initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
  case GET_PRODUCTS:
    newState.products = action.products
    break
  case GET_PRODUCT:
    newState.product = action.product
    break
  case ADD_PRODUCT:
    newState.products = [...newState.products, action.product]
    break
  case REMOVE_PRODUCT:
    newState.products = newState.products.filter(product => {
          if(product.id !== action.product.id) return product;
        })
    break
  case EDIT_PRODUCT:
    newState.products = newState.products.map(product =>
      product.id === action.product.id ? action.product : product
    )
    break
  default:
    return state
  }
  return newState
}
