import React, {useEffect, useReducer} from "react";
import {Button, ButtonGroup, Label, Loader} from "../../components";
import {ActionType, initialState, reducer} from "./reducer/reducer"
import VendingMachineDisplay from "./components/vending_machine_display/vending-machine-display";
import VendingMachineProduct from "./components/vending_machine_product/vending-machine-product";
import Select from "react-select";
import coins from "./constants/coins";

import "./vending-machine.css";

const VendingMachine = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const {message, insertedCoins, products, balance, loading, product} = state;

    useEffect(() => {
        const abortController = new AbortController();
        (async () => {
            try {
                dispatch({type: ActionType.LOADING})
                const response = await fetch("http://localhost:3000/products", {
                    method: "GET",
                    signal: abortController.signal,
                });
                const data = await response.json();
                dispatch({type: ActionType.SET_PRODUCTS, products: data});
            } catch (error) {
                console.error(`An error has occurred: ${error.message}`)
            }
        })();
        return () => {
            abortController.abort();
            dispatch({type: ActionType.CLEAR_STATE});
        }
    }, []);

    useEffect(() => {
        if (!!product) {
            setTimeout(() => {
                dispatch({type: ActionType.TAKE_PRODUCT});
            }, 2000);
        }
    }, [product]);

    const handleInsertCoins = (value) => {
        const total = (balance + value).toFixed(1);
        const message = `Current balance: ${total}€`;
        dispatch({type: ActionType.INSERT_COINS, total: +total, message: message});
    }

    const handleCoinsReturn = () => {
        const message = `Please, insert coins...`;
        dispatch({type: ActionType.RETURN_COINS, coinReturn: insertedCoins, message: message});
    }

    const handleProductSelect = (selection) => {
        const {value} = selection;
        if (value.quantity === 0) {
            dispatch({
                type: ActionType.UPDATE_MESSAGE,
                message: `Product is out of stock. Please select another or take your coins - ${balance}€...`
            });
        } else if (balance >= value.price) {
            const updatedProducts = products.map(product => {
                const {id, quantity} = product;
                if (id === value.id) {
                    return {
                        ...product,
                        quantity: quantity - 1,
                    }
                } else {
                    return product;
                }
            });
            const newBalance = (balance - value.price).toFixed(1);
            dispatch({type: ActionType.BUY_PRODUCT, balance: +newBalance, product: value, products: updatedProducts});
        } else {
            dispatch({
                type: ActionType.UPDATE_MESSAGE,
                message: `Not enough balance - ${balance}€. Please, insert coins...`
            });
        }
    }

    const items = products.map(product => (
        <VendingMachineProduct key={product.id} quantity={product.quantity} price={product.price} name={product.name}
                               imageSrc={product.imageSrc}/>));

    const productsSelectOptions = products.map(product => ({
        label: product.name,
        value: product
    }))

    const isReturnCoinsButtonDisabled = insertedCoins === 0;

    return <div className="container">
        <Label label={"Vending Machine"} className={"title"}/>
        <div className={"inner-container"}>
            <div className={"column left"}>
                <div className={"products-grid"}>
                    {loading ? <Loader/> : items}
                </div>
                <div className={"product-receive"}>
                    {!!product && <VendingMachineProduct name={product.name} imageSrc={product.imageSrc}/>}
                </div>
            </div>
            <div className={"column right"}>
                <VendingMachineDisplay message={message}/>
                <ButtonGroup items={coins} onClick={handleInsertCoins} className={"coins-input"}/>
                <Button onClick={handleCoinsReturn} disabled={isReturnCoinsButtonDisabled}
                        label={"Return coins"} className={"return-coins-button"}/>
                <Select
                    className={"product-select"}
                    placeholder={"Please, select product..."}
                    isLoading={loading}
                    isClearable
                    isSearchable
                    options={productsSelectOptions}
                    value={null}
                    onChange={handleProductSelect}
                />
            </div>
        </div>
    </div>;
}

export default VendingMachine;