function getFirstImage(props) {
    if (Array.isArray(props.arrayOfImages) && props.arrayOfImages.length > 0) {
        console.log(props.arrayOfImages[0].url)
        return props.arrayOfImages[0].url;
    } else {
        return undefined;
    }
}

function roundToNearestThousand(number) {
    return Math.round(number / 1000) * 1000;
}

function getCookie(name) {
    const cookiesArray = document.cookie.split(';');

    for (let i = 0; i < cookiesArray.length; i++) {
        const cookie = cookiesArray[i].trim();
        // Check if the cookie starts with the provided name
        if (cookie.startsWith(`${name}=`)) {
            // Extract the value of the cookie
            return cookie.substring(`${name}=`.length);
        }
    }

    // Return null if the cookie is not found
    return null;
}

function genNewSearchParamString(key, value, searchParams) {
    const sp = new URLSearchParams(searchParams)
    if (value === null) {
        sp.delete(key)
    } else {
        sp.set(key, value)
    }
    return `?${sp.toString()}`
}


export { getFirstImage, roundToNearestThousand, getCookie, genNewSearchParamString }