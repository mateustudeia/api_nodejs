export default function calculaMediaVotos (totalVotos: string, somaVotos: number) {
    const media = parseInt(totalVotos) / somaVotos;
    return media;
}