function pathtoID(path) {
    // 16 to 10 algorithm
    let imgid = path.split('.')[0]
    let temp = imgid.split('/')
    imgid = ""
    for (var i = 0; i < temp.length; i++) {
        if (temp[i] == "fileStorage")
            continue;
        else
            imgid += temp[i]
    }
    return parseInt(imgid, 16)
}

export default pathtoID