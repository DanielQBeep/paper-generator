export default function BrandTicker(data: any) {
    data?.carts.reduce((code: any, cart: any) => {
        const brandCode = cart?.item?.main?.brand?.code?.toLowerCase();
        code[brandCode] = true;
        return code;
    }, {});
}

const brandSample = {
    "status": 1,
    "message": "Success!",
    "pagination": null,
    "data": {
        "carts": [
            {
                "item": {
                    "main": {
                        "brand": {
                            "id": 3,
                            "name": "LabRMS",
                            "status": "1",
                            "code": "RMS"
                        }
                    }
                },
            },
            {
                "item": {
                    "main": {
                        "brand": {
                            "id": 3,
                            "name": "LabRMS",
                            "status": "1",
                            "code": "MF3"
                        }
                    }
                },
            },
            {
                "item": {
                    "main": {
                        "brand": {
                            "id": 3,
                            "name": "LabRMS",
                            "status": "1",
                            "code": "MF3"
                        }
                    }
                },
            }
        ]
    },
}