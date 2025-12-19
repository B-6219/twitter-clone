import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username }).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.log("Error in getUserProfile " , error.message);
        
    }
}

export const followUnfollowUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userToModify = await User.findById(id);
        const currentUser = await User.findById(req.user.id);

        if (id === req.user.id) {
            return res.status(400).json({ error: "You cannot follow/unfollow yourself" });  
        }

        if(!userToModify || !currentUser){
            return res.status(404).json({ error: "User not found" });
        }

        const isFollowing = currentUser.following.includes(id);
        if (isFollowing) {
            //unfollow
            await User.findByIdAndUpdate(id, {pull: { followers: req.user.id }});
            await User.findByIdAndUpdate(req.user.id, {pull: { following: id }});
            res.status(200).json({ message: "User unfollowed successfully" });
        } else {
            //follow
            await User.findByIdAndUpdate(id, { $push: { followers: req.user.id } });
            await User.findByIdAndUpdate(req.user.id, { $push: { following: id } });
            res.status(200).json({ message: "User followed successfully" });
        }

    } catch (error) {
        res.status(500).json({ error: "Server error" });
        console.log("Error in getUserProfile " , error.message);
    }
}