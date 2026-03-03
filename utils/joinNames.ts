type joinNameData = {
    name: string
}

/**
 * Returns all names from the array of objects separated by a comma or the individual name if there's only 1 item in the array
 * 
 * @param data An array of objects containing a `name` property
 * @returns string
 */
export const joinNames = (data: joinNameData[]) => {
    let returnText = '';

    if (data.length > 1) {
        const dataArray = data.map((item) => item?.name);
        returnText = dataArray?.join(', ')
    } else {
        returnText = data[0]?.name;
    }

    return returnText;
}