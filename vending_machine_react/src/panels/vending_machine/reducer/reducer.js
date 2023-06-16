
export const ActionType = Object.freeze({
    INSERT_COINS: "INSERT_COINS",
    RETURN_COINS: "RETURN_COINS",
    BUY_PRODUCT: "BUY_PRODUCT",
    SET_PRODUCTS: "SET_PRODUCTS",
    TAKE_PRODUCT: "TAKE_PRODUCT",
    LOADING: "LOADING",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    CLEAR_STATE: "CLEAR_STATE"
});

export const initialState = {
    insertedCoins: 0,
    balance: 0,
    coinReturn: 0,
    message: "Please, insert coins...",
    products: [],
    loading: false,
    product: null,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case ActionType.INSERT_COINS:
            return {...state, insertedCoins: action.total, balance: action.total, message: action.message }
        case ActionType.RETURN_COINS:
            return {...state, coinReturn: action.coinReturn, insertedCoins: 0, balance: 0, message: action.message}
        case ActionType.SET_PRODUCTS:
            return {...state, products: action.products, loading: false}
        case ActionType.BUY_PRODUCT:
            return {...state, balance: action.balance, product: action.product, products: action.products, message: `Current balance: ${action.balance}€`}
        case ActionType.UPDATE_MESSAGE:
            return {...state, message: action.message}
        case ActionType.LOADING:
            return {...state, loading: true}
        case ActionType.TAKE_PRODUCT:
            return {...state, product: null}
        case ActionType.CLEAR_STATE:
            return initialState
        default:
            return state;
    }
}