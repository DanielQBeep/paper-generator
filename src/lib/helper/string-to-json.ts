export default function StringToJson(data: any) {
    if (!data) return null

    return JSON.parse(data);

}