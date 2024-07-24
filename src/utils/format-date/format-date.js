import moment from "moment"

export const formatDate = (dateString) => {
    if (dateString.includes('T')) {
        return moment(dateString).format('DD/MM/YYYY')
    } else {
        return moment(dateString, 'YYYYMMDDHHmmss').format('DD/MM/YYYY')
    }
}