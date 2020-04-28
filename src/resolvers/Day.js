function postedBy(parent, args, context) {
  return context.prisma.day({ id: parent.id }).postedBy();
}

module.exports = {
  postedBy,
};
