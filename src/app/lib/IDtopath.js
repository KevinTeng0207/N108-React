function IDtopath(id) {
    // 10 to 16 algorithm
    let temp = id.toString(16).padStart(8, '0')
    let path = ""
    for (var i = 0; i < temp.length; i++) {
        path += temp[i]
        if (i % 2 == 1 && i != temp.length - 1)
            path += "/"
    }
    return path
}

export default IDtopath

