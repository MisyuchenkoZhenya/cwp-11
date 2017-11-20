module.exports = {
    "sortByField": (array, field) => {
        let newArray = array.sort((a, b) => { 
            if (a[field] < b[field]) return -1; 
            if (a[field] > b[field]) return 1; 
            return 0; 
        });
    }
}
