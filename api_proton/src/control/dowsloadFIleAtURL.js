export function dowloadFileAtURL(fileName, blob, type)
{
    //console.log(byteArray['data'])
    // fetch(url).then((response) => response.blob()).then((blob) => {
    //     const blobURL = window.URL.createObjectURL(new Blob([blob]))
    //     const fileName = url.split("/").pop()
    //     const aTag = document.createElement("a")
    //     aTag.href = blobURL
    //     aTag.setAttribute("download",fileName)
    //     document.body.appendChild(aTag)
    //     aTag.click()
    //     aTag.remove()
    // })

        const blobURL = window.URL.createObjectURL(new Blob([new Uint8Array(blob['data'])], {type: type}))
        //const fileName = url.split("/").pop()
        const aTag = document.createElement("a")
        aTag.href = blobURL
        aTag.setAttribute("download",fileName)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
}