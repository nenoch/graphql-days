function feed(parent, args, context, info) {
    return context.prisma.days()
  }
  
  module.exports = {
    feed,
  }