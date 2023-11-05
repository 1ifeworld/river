import { operator } from '../constants/addresses';
export function isValidSchemaRegistration({ sender, schema, data, }) {
    // check if function was called by operator
    if (sender != operator)
        return false;
    return true;
}
