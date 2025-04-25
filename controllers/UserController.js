
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");




const register = async (req,res) => {
    const{

        username,
        email,
        password,
        phoneNumber,
        avatar,
        bio,
        socialLinks
    } = req.body


try {
    const existingUser = await User.findOne({email});

    if(existingUser)
        return res.status(400).json({message : "User already exists"});

    const HashPassword = await bcrypt.hash(password,10);

    const newUser = new User({
        username,
        email,
        password: HashPassword,
        phoneNumber,
        avatar: avatar || "", 
        bio: bio || "",       
        isEmailVerified: true, 
        socialLinks: {
          instagram: socialLinks?.instagram || "",
          tiktok: socialLinks?.tiktok || "",
          youtube: socialLinks?.youtube || ""
        },
        role: "user",
        isBlocked: false
      });

    await newUser.save();
      
    res.status(201).json({ message: "User registered successfully", user: newUser });

}
catch(error){
    res.status(500).json({ message: err.message });
};
}


const login = async (req,res)=>{

    const {email , password} = req.body;

    try{

        const user = await User.findOne({email});
        if (!user) return res.status(400).json({ message: "Invalid email or password" });
        
        const MatchPass = await bcrypt.compare(password,user.password);
        if (!MatchPass) return res.status(400).json({ message: "Invalid email or password" });

        if (!user.isEmailVerified) {
            return res.status(403).json({ message: "Please verify your email before logging in." });
          }

        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "2d" }
        )

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
              id: user._id,
              username: user.username,
              email: user.email,
              avatar: user.avatar,
              role: user.role
            }
          });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
      }

}

module.exports = { register , login};
