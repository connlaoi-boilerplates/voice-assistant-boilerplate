import axios from 'axios'

import * as ActionTypes from '../constants/actionTypes'

// Fetch Data Example
// export const fetchItemsData = () => ({
//   type: ActionTypes.HOME_FETCHITEMS_LOAD,
//   isItemsLoading: true,
//   isItemsSuccess: false
// });

// export const itemsRequestFailed = (err) => ({
//   type: ActionTypes.HOME_FETCHITEMS_FAIL,
//   isItemsLoading: false,
//   itemsError: err
// });

// export const itemsRequestSucceeded = (data) => ({
//   type: ActionTypes.HOME_FETCHITEMS_SUCCEED,
//   isItemsLoading: false,
//   isItemsSuccess: true,
//   items: data
// });

// export const fetchItems = () => {
//   return (dispatch) => {
//     dispatch(fetchItemsData());
//     axios
//       .get('https://YOUR_API_URL/YOUR_API_ROUTE')
//       .then((res) => dispatch(itemsRequestSucceeded(res.data)))
//       .catch((err) => dispatch(itemsRequestFailed(err)));
//   };
// };
