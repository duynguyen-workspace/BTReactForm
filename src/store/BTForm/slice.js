import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    productList: [],
    productEdit: undefined,
}

export const BTFormSlice = createSlice({
    name: "BTForm",
    initialState,
    reducers: {
        createProduct: (state, { payload }) => {
            state.productList.push(payload)
            // alert("Add product successfully!")
        },
        deleteProduct: (state, { payload }) => {
            const newList = state.productList.filter((value) => value.id != payload.id)
            state.productList = newList
            // alert("Delete product successfully!")
        },
        setProductEdit: (state, { payload }) => {
            state.productEdit = payload
        },
        updateProduct: (state, {payload}) => {
            let index = state.productList.findIndex((value) => value.id == state.productEdit.id)

            if (index != -1) {
                state.productList[index] = payload
                // alert("Update product successfully!")
            }
        },
        resetProductEdit: (state, action) => {
            state.productEdit = undefined
        }
    }
})

export const { reducer: btFormReducer, actions: btFormAction } = BTFormSlice