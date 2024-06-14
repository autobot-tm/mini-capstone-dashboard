import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  propsModal: '',
  accountInfoModal: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAccountInfoModal: (state, action) => {
      state.accountInfoModal = true
      state.propsModal = action.payload
    },
    closeAccountInfoModal: (state) => {
      state.accountInfoModal = false
      state.propsModal = ''
    },
  },
})

export default modalSlice.reducer
export const { openAccountInfoModal, closeAccountInfoModal } =
  modalSlice.actions
