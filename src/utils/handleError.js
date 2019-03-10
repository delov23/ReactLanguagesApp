import { toast } from 'react-toastify';

export default function handleError(error) {
    if (typeof error === 'string') {
        toast.error(error);
    } else {
        toast.error(error.message || error.msg || 'Something went wrong');
    }
}