import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const mycontactsApi = createApi({
  reducerPath: 'mycontactsApi',
  tagTypes: ['Mycontact'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://640768f077c1a905a0f83919.mockapi.io',
  }),
  endpoints: builder => ({
    fetchContacts: builder.query({
      query: () => `/mycontacts`,
      providesTags: ['Mycontact'],
    }),
    addContact: builder.mutation({
      query: values => ({
        url: `/mycontacts`,
        method: 'POST',
        body: values,
      }),
      invalidatesTags: ['Mycontact'],
    }),
    deleteContact: builder.mutation({
      query: id => ({
        url: `/mycontacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Mycontact'],
    }),
  }),
});
export const {
  useFetchContactsQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = mycontactsApi;

// import { createSlice } from '@reduxjs/toolkit';
// import { fetchContacts, addContact, deleteContact } from './operations';

// const handlePending = state => {
//   state.isLoading = true;
// };
// const handleRejected = (state, action) => {
//   state.isLoading = false;
//   state.error = action.payload;
// };

// const contactsSlice = createSlice({
//   name: 'contacts',
//   initialState: { items: [], isLoading: false, error: null },

//   extraReducers: {
//     [fetchContacts.pending]: handlePending,
//     [fetchContacts.fulfilled](state, action) {
//       state.isLoading = false;
//       // state.items = action.payload;
//       state.items = action.payload.sort((a, b) => a.name.localeCompare(b.name));
//       state.error = null;
//     },
//     [fetchContacts.rejected]: handleRejected,
//     [addContact.pending]: handlePending,
//     [addContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       state.items.unshift(action.payload);
//     },
//     [addContact.rejected]: handleRejected,
//     [deleteContact.pending]: handlePending,
//     [deleteContact.fulfilled](state, action) {
//       state.isLoading = false;
//       state.error = null;
//       const index = state.items.findIndex(
//         contact => contact.id === action.payload.id
//       );
//       state.items.splice(index, 1);
//     },
//     [deleteContact.rejected]: handleRejected,
//   },
// });

// export const contactsReducer = contactsSlice.reducer;
