import { operator } from '../constants/addresses';
export function isValidNodeRegistration({ sender, nodeId, data, }) {
    // check if function was called by operator
    if (sender != operator)
        return false;
    return true;
}
