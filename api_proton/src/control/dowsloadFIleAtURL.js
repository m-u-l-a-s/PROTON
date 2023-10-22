export function dowloadFileAtURL(fileName, blob, type)
{
        const blobURL = window.URL.createObjectURL(new Blob([new Uint8Array(blob['data'])], {type: type}))
        //const fileName = url.split("/").pop()
        const aTag = document.createElement("a")
        aTag.href = blobURL
        aTag.setAttribute("download",fileName)
        document.body.appendChild(aTag)
        aTag.click()
        aTag.remove()
}