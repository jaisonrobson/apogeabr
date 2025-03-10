export const urlToFile = async (url) => {
    // Extrai o nome do arquivo da URL pegando tudo após a última "/"
    const filename = url.split('/').pop().split('?')[0]; // Remove parâmetros extras, se houver

    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], filename, { type: blob.type });

    return file;
}

export const getImageBlobDataTransferFromUrl = async (url) => {
    const file = await urlToFile(url);

    // Criando um DataTransfer para simular um arquivo carregado no input
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);

    return dataTransfer
}