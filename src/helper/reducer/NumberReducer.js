export const NumberReducer = (state = [], action) => {
    
    switch (action.type) {
        case "pluss":
            return action.payload + 1;
            
        case "rest":
            return action.payload - 1;

        default:
            return state;
    }
}
