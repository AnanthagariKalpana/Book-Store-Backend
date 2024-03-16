import Address from '../models/address.model';

export const addAddress=async(userId)=>{

    try{
        const user= await Address.findOne({userId: userId});
        if(!user)
        {
            const address =await Address.create({
                userId:userId,
                address:[
                    {
                        fullName: userId.fullName,
                        mobileNumber: userId.mobileNumber,
                        address:userId.address,
                        city:userId.city,
                        state:userId.state,
                        type:userId.type
                    }
                ]
            });
            return address;
        }

        user.address.push({
            
            fullName: userId.fullName,
            mobileNumber: userId.mobileNumber,
            address:userId.address,
            city:userId.city,
            state:userId.state,
            type:userId.type
        });
        
         user.save();

         return user;
    }
    catch(error)
    {
        console.log(error);
    }
}