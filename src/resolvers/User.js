function days(parent, args, context) {
  return context.prisma.user({ id: parent.id }).days();
}

module.exports = {
  days,
};
