
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const cloudinary = require("../config/Cloudinary");

const verifyEmail = async (req, res) => {
    const token = req.params.token;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.userId;
  
      await User.findByIdAndUpdate(userId, { isEmailVerified: true });
  
      res.status(200).send("Email verified successfully!");
    } catch (err) {
      res.status(400).send("Invalid or expired token");
    }
  };


const register = async (req,res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Missing request body" });
  }
    const{

      username,
        email,
        password,
        phoneNumber,
        bio,
        socialLinks
    } = req.body
    const result = await cloudinary.uploader.upload(req.file.path, {
          resource_type: "image",  // تحديد نوع المحتوى كـ فيديو
          public_id: `images/${req.file.filename}`,  // تعيين اسم الفيديو في Cloudinary
          overwrite: true,  // استبدال الفيديو بنفس الاسم إذا كان موجودًا
          
        });

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
      avatar: result.secure_url,  // Store the avatar URL
      bio: bio || "",
      isEmailVerified: false,
      socialLinks: {
          instagram: socialLinks?.instagram || "",
          tiktok: socialLinks?.tiktok || "",
          youtube: socialLinks?.youtube || ""
      },
      role: "user",
      isBlocked: false
  });

    await newUser.save();

    const jwt = require("jsonwebtoken");
    const token = jwt.sign(
        { userId: newUser._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      
      const verifyLink = `http://localhost:5000/api/users/verify-email/${token}`;
      console.log(`📩 Email Verification Link:${verifyLink}`);

    res.status(201).json({ message: "User registered successfully", user: newUser });

}
catch(error){
    res.status(500).json({ message: error.message });
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

module.exports = { register , login , verifyEmail };
