enum sizeNames {
    XS = 'XS',
    SM = 'SM',
    MD = 'MD',
    LG = 'LG',
    XL = 'XL',
}

const windowSizes = {
    [sizeNames.XS]: 576,
    [sizeNames.SM]: 768,
    [sizeNames.MD]: 992,
    [sizeNames.LG]: 1200,
}

export {
    sizeNames,
    windowSizes
}