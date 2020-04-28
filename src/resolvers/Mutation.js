const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

function postDay(root, args, context) {
  const userId = getUserId(context);
  return context.prisma.createDay({
    title: args.title,
    content: args.content,
    postedBy: { connect: { id: userId } },
  });
}

async function signup(parent, args, context, info) {
  const hashedPassword = await bcrypt.hash(args.password, 10);
  const { password, ...user } = await context.prisma.createUser({
    ...args,
    password: hashedPassword,
  });
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

async function login(parent, args, context, info) {
  const { password, ...user } = await context.prisma.user({ name: args.name });
  if (!user) {
    throw new Error("No such user found");
  }
  const valid = await bcrypt.compare(args.password, password);
  if (!valid) {
    throw new Error("Invalid password");
  }
  const token = jwt.sign({ userId: user.id }, APP_SECRET);
  return {
    token,
    user,
  };
}

module.exports = {
  signup,
  login,
  postDay,
};
