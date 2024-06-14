import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accountDetailModal: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openAccountDetailModal: (state) => {
      state.accountDetailModal = true
    },
    closeAccountDetailModal: (state) => {
      state.accountDetailModal = false
    },
  },
})

export default modalSlice.reducer
export const { openAccountDetailModal, closeAccountDetailModal } =
  modalSlice.actions
