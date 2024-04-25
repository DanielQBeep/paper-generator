export default function JsonToString(data: any) {
    if (!data) return null


    delete data?.beneficiary?.full_name
    delete data?.beneficiary?.address?.render_full_address
    delete data?.beneficiary?.address?.related?.full_name
    delete data?.beneficiary?.address?.related?.full_name
    delete data?.shipping?.render_full_address
    delete data?.user_buyer?.company?.full_name
    delete data?.billing?.render_full_address
    delete data?.tnc
    delete data?.roles
    data?.carts.forEach((cart: any) => {
        delete cart?.render_remark
    })

    try {
        return '?data=' + encodeURIComponent(JSON.stringify(data));
    } catch (e) {
        return null
    }


}