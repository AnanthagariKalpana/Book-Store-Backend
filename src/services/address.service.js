import Address from '../models/address.model';

export const addAddress = async (userId, body) => {
    try {
        const userAddress = await Address.findOne({ userId: userId });
        console.log(userId,body);
        if (!userAddress) {
            const address = await Address.create({
                userId: userId,
                address: [
                    {
                        fullName: body.fullName,
                        mobileNumber: body.mobileNumber,
                        address: body.address,
                        city: body.city,
                        state: body.state,
                        type: body.type
                    }
                ]
            });

            return address;
        }

        // const isAddressExist = userAddress.address.some(
        //     (addr) =>
        //         addr.fullName === userId.fullName &&
        //         addr.mobileNumber === userId.mobileNumber &&
        //         addr.address === userId.address &&
        //         addr.city === userId.city &&
        //         addr.state === userId.state &&
        //         addr.type === userId.type
        // );

        // if (isAddressExist) {
        //     // If the address already exists, return a message
        //     return "Address already exists for this user";
        // }

        userAddress.address.push({
            fullName: body.fullName,
            mobileNumber: body.mobileNumber,
            address: body.address,
            city: body.city,
            state: body.state,
            type: body.type
        });

        await userAddress.save();

        return userAddress;
    } catch (error) {
        console.log(error);
        throw new Error("Failed to add address");
    }
};


export const getAddress = async (userId) => {
    try {
        const userAddresses = await Address.findOne({ userId: userId });

        if (!userAddresses) {
            return "No addresses found for this user";
        }

        return userAddresses; // Assuming "address" is the array field containing addresses
    } catch (error) {
        console.log(error);
        throw new Error("Failed to get user addresses");
    }
};