const signUp = async (req, res) => {
  //const { email, password } = req.body;
//   try {
//     const user = await User.create({ email, password });
//     res.status(201).json({ user });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }

res.send('Sign up works');
};

module.exports = { signUp };