import { toast } from 'react-toastify';

export default function handleSuccess(message) {
    if (typeof message === 'string') {
        toast.success(message);
    } else {
        toast.success(message.message || message.msg || 'Success!');
    }
}