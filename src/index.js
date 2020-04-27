const { GraphQLServer } = require("graphql-yoga");

const mockDays = [
  {
    id: "day-0",
    author: "Irene",
    content: "Love listening to my own voice",
    title: "Prepping",
  },
];

let idCount = mockDays.length;

const resolvers = {
  Query: {
    info: () => `This is an API`,
    feed: () => mockDays,
  },
  Mutation: {
    postDay: (parent, args) => {
      const day = {
        id: `day-${idCount++}`,
        author: args.author || "Anon",
        title: args.title,
        content: args.content,
      };
      mockDays.push(day);
      return day;
    },
  },
  Day: {
    id: (parent) => parent.id,
    author: (parent) => parent.author,
    content: (parent) => parent.content,
    title: (parent) => parent.title,
  },
};

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
});
server.start(() => console.log(`Server is running on http://localhost:4000`));
