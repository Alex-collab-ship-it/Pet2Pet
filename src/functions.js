

export const onlyDigits = (s) => {
    let r = ''
    for (let i = 0; i<s.length; i++) {
        if (!isNaN(s[i]))
            r += s[i]
    }
    return r.replace(/\s/g, '')
}

export const formatMobileNumber = (text) => {
    let res = ''
    text = onlyDigits(text)
    if (text[0]) { res = '+7 ('+text[0]
        if (text[1]) {res += text[1]
            if (text[2]) {
                res += text[2]
                if (text[3]) {
                    res += ') ' + text[3]
                    if (text[4]) {
                        res += text[4]
                        if (text[5]) {
                            res += text[5]
                            if (text[6]) {
                                res +='-' + text[6]
                                if (text[7]) {
                                    res += text[7]
                                    if (text[8]) {
                                        res += '-' + text[8]
                                        if (text[9]) {
                                            res += text[9]
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    
    
    return res;
}

