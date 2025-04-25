const User = require ("../");
const bcrypt = requore("bcryptjs");

const register = async (req,res) => {
    const{

        username,
        email,
        password,
        phoneNumber,
        avatar,
        bio,
        isEmailVerified,
        socialLinks
    } = req.body
}

try {
    const existingUser = await User.findone({email});

    if(existingUser)
        return res.status(400).json({message : "User already exists"});

    const HashPassword = await bcrypt.hash(password,10);

    

}
catch(error){

}