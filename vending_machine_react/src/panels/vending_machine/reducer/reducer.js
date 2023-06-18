export const ActionType = Object.freeze({
    INSERT_COINS: "INSERT_COINS",
    RETURN_COINS: "RETURN_COINS",
    SET_PRODUCTS: "SET_PRODUCTS",
    BUY_PRODUCT: "BUY_PRODUCT",
    TAKE_PRODUCT: "TAKE_PRODUCT",
    LOADING: "LOADING",
    UPDATE_MESSAGE: "UPDATE_MESSAGE",
    CLEAR_STATE: "CLEAR_STATE"
});

export const initialState = {
    insertedCoins: 0,
    change: 0,
    message: "Please, insert coins...",
    products: [],
    processing: false,
    loading: false,
    product: null,
};

export const reducer = (state, action) => {
    const {type, payload} = action;
    switch (type) {
        case ActionType.INSERT_COINS:
            return {...state, insertedCoins: payload.coins, change: payload.coins, message: payload.message}
        case ActionType.RETURN_COINS:
            return {...state, insertedCoins: 0, change: payload.change, message: payload.message}
        case ActionType.SET_PRODUCTS:
            return {...state, products: payload.products, loading: false}
        case ActionType.BUY_PRODUCT:
            return {
                ...state,
                change: payload.change,
                product: payload.product,
                products: payload.products,
                message: `Thank you! Your change is: ${payload.change}€`,
                processing: true,
            }
        case ActionType.UPDATE_MESSAGE:
            return {...state, message: payload.message}
        case ActionType.LOADING:
            return {...state, loading: true}
        case ActionType.TAKE_PRODUCT:
            return {
                ...state,
                product: null,
                message: initialState.message,
                insertedCoins: initialState.insertedCoins,
                change: initialState.change,
                processing: initialState.processing,
            }
        case ActionType.CLEAR_STATE:
            return initialState
        default:
            return state;
    }
}