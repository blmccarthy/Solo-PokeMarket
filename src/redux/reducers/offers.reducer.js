import { combineReducers } from 'redux';

const incomingOffersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_INCOMING_OFFERS':
            return action.payload
        default:
            return state;
    }
};

const outgoingOffersReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OUTGOING_OFFERS':
            return action.payload
        default:
            return state;
    }
};

const currentOfferReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_OFFER_METADATA':
            const { listing_id, buyer_user_id, seller_user_id, offer_type } = action.payload
            return {
                ...state,
                listing_id: listing_id,
                buyer_user_id: buyer_user_id,
                seller_user_id: seller_user_id,
                offer_type: offer_type,
            }
        case 'SET_OFFER':
            return {
                ...state,
                [action.payload.property]: action.payload.value
            }
        default:
            return state;
    }
};

export default combineReducers({
    currentOfferReducer,
    incomingOffersReducer,
    outgoingOffersReducer,
});
